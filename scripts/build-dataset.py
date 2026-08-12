import json
import os
import re
from collections import Counter

import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET = os.path.join(ROOT, "dataset")
OUT = os.path.join(DATASET, "universities.compiled.json")
HIPOLABS = os.path.join(DATASET, "hipolabs-world-universities.json")

TAG_PATTERNS = {
    "technology": [
        r"\bTECHNOLOG\w*", r"\bCOMPUTER\w*", r"\bINFORMATION TECH\w*", r"\bSOFTWARE\w*",
        r"\bCYBER\w*", r"\bELECTRONIC\w*", r"\bROBOTIC\w*", r"\bARTIFICIAL INTELLIGENCE\b",
        r"\bDATA SCIENCE\b", r"\bINFORMATION SCIENCE\b", r"\bIIT\b", r"\bIIIT\b",
    ],
    "engineering": [
        r"\bENGINEERING\b", r"\bPOLYTECHNIC\b", r"\bTECHNICAL\b", r"\bMECHANICAL\b",
        r"\bCIVIL\b", r"\bELECTRICAL\b", r"\bAERONAUTICAL\b", r"\bAEROSPACE\b",
        r"\bMARINE\b", r"\bMARITIME\b", r"\bPETROLEUM\b", r"\bAUTOMOBILE\b", r"\bMINING\b",
        r"\bCHEMICAL\b", r"\bNIT\b", r"\bARCHITECTURE\b",
    ],
    "business": [
        r"\bMANAGEMENT\b", r"\bCOMMERCE\b", r"\bBUSINESS\b", r"\bMBA\b", r"\bPGDM\b",
        r"\bENTREPRENEUR\w*", r"\bACCOUNTING\b", r"\bFINANCE\b", r"\bBANKING\b",
        r"\bINSURANCE\b", r"\bMARKETING\b", r"\bRETAIL\b", r"\bECONOMICS\b", r"\bBUSINESS ADMIN\b",
    ],
    "creative": [
        r"\bDESIGN\b", r"\bFASHION\b", r"\bFINE ARTS\b", r"\bARTS\b", r"\bMUSIC\b",
        r"\bDANCE\b", r"\bANIMATION\b", r"\bVISUAL\w*", r"\bCREATIVE\b", r"\bINTERIOR\b",
        r"\bPAINTING\b", r"\bSCULPTURE\b", r"\bPERFORMING\b",
    ],
    "healthcare": [
        r"\bMEDICAL\b", r"\bMEDICINE\b", r"\bPHARMACY\b", r"\bPHARMACEUT\w*", r"\bNURSING\b",
        r"\bHEALTH\b", r"\bDENTAL\b", r"\bDENTISTRY\b", r"\bPHYSIOTHERAP\w*", r"\bAYURVED\w*",
        r"\bHOMEOPATH\w*", r"\bPARAMEDICAL\b", r"\bHOSPITAL\b", r"\bVETERINARY\b",
        r"\bOPTOMETR\w*", r"\bRADIOGRAPH\w*", r"\bUNANI\b", r"\bSIDDHA\b", r"\bMIDWIFER\w*",
    ],
    "science": [
        r"\bSCIENCE\b", r"\bRESEARCH\b", r"\bBIOTECH\w*", r"\bCHEMISTRY\b", r"\bPHYSICS\b",
        r"\bMATHEMATICS\b", r"\bBIOLOGY\b", r"\bMICROBIOL\w*", r"\bGENETIC\w*", r"\bGEOLOGY\b",
        r"\bZOOLOGY\b", r"\bBOTANY\b", r"\bASTRONOM\w*", r"\bNANOTECH\w*", r"\bSCIENTIFIC\b",
    ],
    "law": [r"\bLAW\b", r"\bLEGAL\b", r"\bJURIS\w*"],
    "media": [
        r"\bMEDIA\b", r"\bJOURNAL\w*", r"\bMASS COMM\w*", r"\bBROADCAST\w*", r"\bFILM\w*",
        r"\bCOMMUNICATION\b", r"\bADVERTISING\b", r"\bTELEVISION\b", r"\bCINEMA\b",
        r"\bMULTIMEDIA\b", r"\bPUBLIC RELATIONS\b",
    ],
    "sustainability": [
        r"\bENVIRONMENT\w*", r"\bSUSTAINAB\w*", r"\bECOLOG\w*", r"\bFOREST\w*", r"\bCLIMATE\b",
        r"\bRENEWAB\w*", r"\bENERGY\b", r"\bGREEN\b", r"\bCONSERVATION\b",
    ],
    "education": [
        r"\bEDUCATION\b", r"\bTEACHER\b", r"\bPEDAGOG\w*", r"\bB\.ED\b", r"\bD\.ED\b",
        r"\bPRIMARY TEACHER\b", r"\bSCHOOL OF EDUCATION\b", r"\bT\.T\b", r"\bDIET\b",
        r"\bIASE\b", r"\bG\.C\.T\.E\b", r"\bB\.T\.C\b", r"\bD\.T\.C\b", r"\bE\.T\.T\b",
        r"\bJ\.B\.T\b",
    ],
    "hospitality": [
        r"\bHOTEL\b", r"\bHOSPITALITY\b", r"\bCATERING\b", r"\bTOURISM\b", r"\bTRAVEL\b",
        r"\bCULINARY\b", r"\bFOOD TECHNOLOGY\b", r"\bFOOD PROCESSING\b", r"\bFOOD CRAFTS\b",
    ],
    "agriculture": [
        r"\bAGRICULTUR\w*", r"\bHORTICULTURE\b", r"\bFISHER\w*", r"\bDAIRY\b",
        r"\bSERICULTURE\b", r"\bCROP\b", r"\bSOIL\b", r"\bPLANT SCIENCE\b", r"\bFOOD SCIENCE\b",
        r"\bFOOD AND NUTRITION\b",
    ],
}

STANDALONE_TAGS = {
    "Technical/Polytechnic": ["technology", "engineering"],
    "Nursing (Diploma) Institute": ["healthcare"],
    "Teacher Training (Diploma) Institute": ["education"],
    "Paramedical Institute": ["healthcare"],
    "PGDM Institute": ["business"],
    "Pharmacy Institution": ["healthcare"],
    "Ayurvedic Nursing (Diploma) Institution": ["healthcare"],
    "Hotel Management and Catering Institute": ["hospitality", "business"],
    "Institution under Rehabilitation Council of India": ["healthcare"],
}

GOV_KEYWORDS = [
    "CENTRAL", "AGRICULTUR", "VETERINARY", "FISHER", "TECHNOLOGICAL", "TECHNOLOGY",
    "OPEN UNIVERSITY", "NATIONAL", "AIIMS", "IISC", "IISER", "INDIAN INSTITUTE",
    "INSTITUTE OF NATIONAL IMPORTANCE", "UNIVERSITY OF", "STATE",
]
PRIVATE_KEYWORDS = [
    "PRIVATE", "DEEMED", "INTERNATIONAL", "AMITY", "SRM", "SYMBIOSIS", "BITS",
    "LOVELY", "SHARDA", "GALGOTIAS", "KALINGA", "ALLIANCE", "JAIN UNIVERSITY",
    "ASIAN", "GLOBAL", "WORLD",
]

COUNTRY_TIER = {
    "United States": "premium",
    "United Kingdom": "premium",
    "Australia": "premium",
    "Canada": "mid",
    "Ireland": "mid",
    "New Zealand": "mid",
    "Germany": "budget",
    "France": "mid",
    "Netherlands": "mid",
    "Sweden": "mid",
    "Norway": "mid",
    "Denmark": "mid",
    "Finland": "mid",
    "Switzerland": "premium",
    "Singapore": "premium",
    "Japan": "mid",
    "Korea, Republic of": "mid",
    "China": "mid",
    "United Arab Emirates": "mid",
    "Qatar": "premium",
    "Saudi Arabia": "mid",
    "Malaysia": "budget",
    "Mauritius": "budget",
    "South Africa": "budget",
    "Brazil": "budget",
    "Mexico": "budget",
    "Thailand": "budget",
    "India": "budget",
}

TEST_REQUIRED_COUNTRIES = {
    "United States", "United Kingdom", "Australia", "Canada", "Ireland", "New Zealand",
    "France", "Netherlands", "Sweden", "Norway", "Denmark", "Finland",
}
NO_TEST_COUNTRIES = {"Germany"}


def compile_tag_patterns():
    compiled = {}
    for tag, patterns in TAG_PATTERNS.items():
        compiled[tag] = [re.compile(p, re.IGNORECASE) for p in patterns]
    return compiled


def tags_from_name(name, patterns):
    if not name:
        return []
    result = []
    for tag, regexes in patterns.items():
        for rx in regexes:
            if rx.search(name):
                result.append(tag)
                break
    return result


def to_int(value):
    try:
        return int(float(str(value).strip()))
    except (ValueError, TypeError):
        return None


def india_tier(name, institution_type, management, standalone_type):
    up = (name or "").upper()
    if institution_type == "University":
        if any(k in up for k in GOV_KEYWORDS):
            return "budget"
        if any(k in up for k in PRIVATE_KEYWORDS):
            return "premium"
        return "mid"
    if institution_type == "Standalone":
        if standalone_type and "PGDM" in (standalone_type or ""):
            return "premium"
        if management == "Private Un-Aided":
            return "mid"
        return "budget"
    if institution_type == "College":
        if management == "Private Un-Aided":
            return "mid"
        return "budget"
    return "budget"


def read_rows(path, sheet_name):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb[sheet_name]
    rows = ws.iter_rows(values_only=True)
    next(rows)
    next(rows)
    next(rows)
    for row in rows:
        yield row
    wb.close()


def main():
    patterns = compile_tag_patterns()
    records = []
    counts = Counter()

    uni_path = os.path.join(DATASET, "University-ALL UNIVERSITIES.xlsx")
    for row in read_rows(uni_path, "University-"):
        code, name, state, district, website, year, location = row
        if not name:
            continue
        records.append({
            "id": code,
            "name": str(name).strip(),
            "country": "India",
            "state": str(state).strip() if state else None,
            "city": str(district).strip() if district else None,
            "type": "University",
            "pathway": "domestic",
            "tier": india_tier(name, "University", None, None),
            "tests": False,
            "est": to_int(year),
            "tags": tags_from_name(str(name), patterns),
            "sites": [str(website).strip()] if website else [],
        })
    counts["university"] = len(records)

    stan_path = os.path.join(DATASET, "Standalone-ALL STANDALONE.xlsx")
    stan = 0
    for row in read_rows(stan_path, "Standalone-"):
        code, name, state, district, year, location, stype, mgmt = row
        if not name:
            continue
        tags = list(STANDALONE_TAGS.get(stype, []))
        for t in tags_from_name(str(name), patterns):
            if t not in tags:
                tags.append(t)
        records.append({
            "id": code,
            "name": str(name).strip(),
            "country": "India",
            "state": str(state).strip() if state else None,
            "city": str(district).strip() if district else None,
            "type": "Standalone",
            "pathway": "domestic",
            "tier": india_tier(name, "Standalone", mgmt, stype),
            "tests": False,
            "est": to_int(year),
            "tags": tags,
            "sites": [],
        })
        stan += 1
    counts["standalone"] = stan

    col_path = os.path.join(DATASET, "College-ALL COLLEGE.xlsx")
    col = 0
    for row in read_rows(col_path, "College-"):
        (code, name, state, district, website, year, location, ctype, mgmt,
         uni_code, uni_name, uni_type) = row
        if not name:
            continue
        tags = tags_from_name(str(name), patterns)
        records.append({
            "id": code,
            "name": str(name).strip(),
            "country": "India",
            "state": str(state).strip() if state else None,
            "city": str(district).strip() if district else None,
            "type": "College",
            "pathway": "domestic",
            "tier": india_tier(name, "College", mgmt, None),
            "tests": False,
            "est": to_int(year),
            "tags": tags,
            "sites": [str(website).strip()] if website else [],
            "parent": str(uni_name).strip() if uni_name else None,
        })
        col += 1
    counts["college"] = col

    abroad = 0
    with open(HIPOLABS, encoding="utf-8") as fh:
        hipolabs = json.load(fh)
    for idx, rec in enumerate(hipolabs):
        name = rec.get("name")
        country = rec.get("country")
        if not name or not country:
            continue
        if str(country).strip().lower() == "india":
            continue
        records.append({
            "id": f"H-{idx}",
            "name": str(name).strip(),
            "country": str(country).strip(),
            "state": (rec.get("state-province") or "").strip() or None,
            "city": None,
            "type": "University",
            "pathway": "abroad",
            "tier": COUNTRY_TIER.get(str(country).strip(), "unknown"),
            "tests": True if str(country).strip() in TEST_REQUIRED_COUNTRIES
                    else False if str(country).strip() in NO_TEST_COUNTRIES else None,
            "est": None,
            "tags": tags_from_name(str(name), patterns),
            "sites": [str(p) for p in (rec.get("web_pages") or [])],
        })
        abroad += 1
    counts["abroad"] = abroad

    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(records, fh, ensure_ascii=False, separators=(",", ":"))

    print("total records:", len(records))
    print("breakdown:", dict(counts))
    tag_counter = Counter()
    for r in records:
        for t in r["tags"]:
            tag_counter[t] += 1
    print("tag distribution:", dict(tag_counter.most_common()))
    tier_counter = Counter(r["tier"] for r in records)
    print("tier distribution:", dict(tier_counter))
    size_mb = os.path.getsize(OUT) / (1024 * 1024)
    print(f"output size: {size_mb:.1f} MB")


if __name__ == "__main__":
    main()
