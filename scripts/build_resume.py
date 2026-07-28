# -*- coding: utf-8 -*-
"""Regenerates public/assets/resume.pdf from the current CV content.

This is a hand-maintained mirror of public/cv.html's English content, not an
HTML parser. Whenever cv.html's About/Experience/Skills/Languages/Education/
Patents/Publications content changes, update the matching section below and
re-run this script:

    python3 scripts/build_resume.py

Requires: pip install reportlab
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem, KeepTogether, Image
)
import os

OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "resume.pdf")
OUT_PATH = os.path.abspath(OUT_PATH)

PHOTO_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "images", "profile.png")
PHOTO_PATH = os.path.abspath(PHOTO_PATH)

ACCENT = colors.HexColor("#C0202D")
INK = colors.HexColor("#16181d")
MUTED = colors.HexColor("#5b5f6a")
HAIRLINE = colors.HexColor("#d9d9dc")

styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=22, leading=26, textColor=INK, spaceAfter=1,
)
title_style = ParagraphStyle(
    "TitleLine", parent=styles["Normal"], fontName="Helvetica",
    fontSize=11.5, leading=14, textColor=MUTED, spaceAfter=4,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"], fontName="Helvetica",
    fontSize=8.7, leading=12, textColor=INK,
)
h2_style = ParagraphStyle(
    "H2", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=11.5, leading=14, textColor=ACCENT, spaceBefore=12, spaceAfter=4,
)
entry_title_style = ParagraphStyle(
    "EntryTitle", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=10, leading=13, textColor=INK,
)
entry_date_style = ParagraphStyle(
    "EntryDate", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9, leading=13, textColor=MUTED, alignment=2,
)
org_style = ParagraphStyle(
    "Org", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=9.3, leading=12, textColor=INK, spaceAfter=1,
)
meta_style = ParagraphStyle(
    "Meta", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=9, leading=12, textColor=MUTED, spaceAfter=2,
)
body_style = ParagraphStyle(
    "Body", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.3, leading=13, textColor=INK, spaceAfter=4,
)
bullet_style = ParagraphStyle(
    "Bullet", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.3, leading=13, textColor=INK,
)
skill_items_style = ParagraphStyle(
    "SkillItems", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9.3, leading=13, textColor=INK, spaceAfter=5,
)
pub_style = ParagraphStyle(
    "Pub", parent=styles["Normal"], fontName="Helvetica",
    fontSize=9, leading=13, textColor=INK, spaceAfter=1,
)
pub_venue_style = ParagraphStyle(
    "PubVenue", parent=styles["Normal"], fontName="Helvetica-Oblique",
    fontSize=8.3, leading=11, textColor=MUTED, spaceAfter=6,
)

story = []

# ---------- Header ----------
header_text = [
    Paragraph("Farhad Shadmand", name_style),
    Paragraph("AI Researcher and Developer", title_style),
]
contact_items = [
    '+351 912 292 634',
    '<link href="mailto:farhadsh1992@gmail.com">farhadsh1992@gmail.com</link>',
    '<link href="https://www.farhadshad.com">www.farhadshad.com</link>',
    '<link href="https://www.linkedin.com/in/farhadsh1992/">linkedin.com/in/farhadsh1992</link>',
    '<link href="https://www.github.com/farhadsh1992/">github.com/farhadsh1992</link>',
    '<link href="https://orcid.org/0000-0003-4399-4845">orcid.org/0000-0003-4399-4845</link>',
    '<link href="https://www.researchgate.net/profile/Farhad-Shadmand-2">ResearchGate</link>',
]
for item in contact_items:
    header_text.append(Paragraph(item, contact_style))

if os.path.exists(PHOTO_PATH):
    photo = Image(PHOTO_PATH, width=48 * mm, height=46 * mm)
    header_table = Table(
        [[photo, header_text]],
        colWidths=[50 * mm, None],
    )
    header_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(header_table)
else:
    story.extend(header_text)

story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1.1, color=ACCENT, spaceAfter=2))


def section_heading(text):
    story.append(Paragraph(text.upper(), h2_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=HAIRLINE, spaceAfter=5))


def entry_header(title, dates):
    t = Table(
        [[Paragraph(title, entry_title_style), Paragraph(dates, entry_date_style)]],
        colWidths=[128 * mm, 42 * mm],
    )
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(i, bullet_style), spaceAfter=2) for i in items],
        bulletType="bullet", start="•", leftIndent=12, bulletFontSize=8,
    )


# ---------- About ----------
section_heading("About")
story.append(Paragraph(
    "I am a researcher and developer with hands-on experience building deep learning models based on "
    "diffusion models, GANs, and VLM-based systems on multi-GPU platforms (CUDA). My work has led to "
    "multiple publications, including CVPR, WACV, and IEEE Access. I bring strong skills in PyTorch, "
    "computer vision, model optimization, and AI agents.",
    body_style,
))

# ---------- Experience ----------
section_heading("Experience")

story.append(KeepTogether([
    entry_header(
        "Post-doctoral Researcher &mdash; VisTeam, Institute of Systems and Robotics &ndash; Coimbra (ISR)",
        "2026 &ndash; Present",
    ),
    Paragraph("Coimbra, Portugal", meta_style),
    bullets([
        "Research on generative video models, including video watermarking and diffusion-based generation (Stable Diffusion).",
        "Stack: PyTorch, Hugging Face, Accelerate, Slurm, OpenCV, Weights &amp; Biases (wandb).",
    ]),
    Spacer(1, 7),
]))

story.append(KeepTogether([
    entry_header("Research Intern &mdash; Adobe", "Aug 2025 &ndash; Dec 2025"),
    Paragraph("Paris, France", meta_style),
    bullets([
        "Developed robust watermarking models using geometric symmetry-aware convolutional networks combined with a "
        "VLM-based generative noise-simulation pipeline to accurately replicate print-and-scan degradation effects.",
        "This approach significantly enhanced watermark resilience against real-world distortions introduced during "
        "printing, scanning, and image recapture.",
        "Stack: Deep Learning, AWS, PyTorch Lightning, data distribution.",
    ]),
    Paragraph(
        'Manager: Dr. Shruti Agarwal '
        '(<link href="mailto:shragarw@adobe.com">shragarw@adobe.com</link>)',
        meta_style,
    ),
    Spacer(1, 7),
]))

story.append(KeepTogether([
    entry_header(
        "Researcher &mdash; VisTeam, Institute of Systems and Robotics &ndash; Coimbra (ISR)",
        "Sep 2019 &ndash; Jul 2025",
    ),
    Paragraph("Coimbra, Portugal", meta_style),
    bullets([
        "Developed deep learning models for steganography, watermarking, object detection, face detection, and face verification.",
        'Contributed to the projects '
        '<link href="https://visteam.isr.uc.pt/projects/visual-id-unique-visual-identities-in-graphics-images-and-faces-2/"><b>VISUAL-ID</b></link>, '
        '<link href="https://visteam.isr.uc.pt/projects/truim-trust-image-understanding/"><b>TruIM</b></link>, and '
        '<link href="https://visteam.isr.uc.pt/projects/facing-2/"><b>FACING</b></link>, resulting in multiple '
        'publications and practical solutions for identity-document security.',
        "Stack: deep learning libraries, computer vision libraries (OpenCV, dlib, Pillow), C++, Django, FastAPI.",
    ]),
    Spacer(1, 7),
]))

story.append(KeepTogether([
    entry_header("Researcher &mdash; Instituto Universit&aacute;rio de Lisboa (ISCTE)", "2018 &ndash; 2019"),
    Paragraph("Lisbon, Portugal", meta_style),
    bullets([
        "In 2018, I moved to Lisbon and began my research at Instituto Universitário de Lisboa (ISCTE) and the "
        "Faculty of Sciences of the University of Lisbon (FCUL), under the supervision of Prof. José Carlos Dias.",
        "Applied machine learning, deep learning, and natural language processing (NLP) techniques to analyze "
        "financial markets, processing data from online news websites, Twitter, and stock market platforms to "
        "develop predictive models for financial trends.",
        "Stack: NLP libraries, Python, MATLAB, Requests, BeautifulSoup, REST API.",
    ]),
]))

# ---------- Skills ----------
section_heading("Skills")
skill_groups = [
    ("Programming Languages", "Python, C++, Java (Basic), HTML, CSS"),
    ("AI/ML", "PyTorch, TensorFlow, ONNX, PyTorch Lightning, Hugging Face, DeepSpeed, Scikit-learn, "
              "OpenVINO, XGBoost, LightGBM, CatBoost, torchdata, Accelerate, Keras, JAX, FLAX, Optax, Core ML"),
    ("NLP", "spaCy, NLTK, AllenNLP, Transformers, Tokenizers, Optimum-Intel, Optimum-Neuron, "
            "Optimum-Habana, Optimum-ONNX, OpenAI SDK"),
    ("AI Agents", "LangChain, LangSmith, LangGraph, LangFlow, RAG, Gradio"),
    ("Systems", "Multi-GPU, CUDA, SLURM, Docker, Kubernetes (K8s), OpenHPC"),
    ("CI/CD", "Jenkins, GitHub Actions, GitLab CI"),
    ("Computer Vision", "OpenCV, dlib, Pillow"),
    ("Data", "SQL, MySQL, Spark, pandas, ChromaDB"),
]
for label, items in skill_groups:
    story.append(Paragraph(
        '<font color="#5b5f6a"><b>{}:</b></font> {}'.format(label, items),
        skill_items_style,
    ))

# ---------- Languages ----------
section_heading("Languages")
story.append(Paragraph("Persian (Native), English (Fluent), Portuguese (Beginner)", body_style))

# ---------- Education ----------
section_heading("Education")

story.append(KeepTogether([
    entry_header("PhD in Electrical Engineering and Intelligent Systems", "2021 &ndash; 2026"),
    Paragraph("University of Coimbra &mdash; Coimbra, Portugal", org_style),
    Paragraph(
        "My PhD focused on developing printable steganography and watermarking models for identity-document "
        "security, combining encoder&ndash;decoder architectures, geometric-symmetric convolutions, and advanced "
        "noise-simulation pipelines. I designed and optimized several deep-learning frameworks for reliable "
        "message embedding under real print-and-capture distortions. The work resulted in multiple publications, "
        "including IEEE Access, CVPR, and WACV.",
        body_style,
    ),
    Paragraph(
        'Supervisors: Prof. Nuno Gon&ccedil;alves '
        '(<link href="mailto:nunogon@deec.uc.pt">nunogon@deec.uc.pt</link>) and Prof. Luiz Schirmer '
        '(<link href="mailto:Luiz.schirmer@ufsm.br">Luiz.schirmer@ufsm.br</link>)',
        meta_style,
    ),
    Spacer(1, 7),
]))

story.append(KeepTogether([
    entry_header("M.Sc. in Complex Systems, Physics", "2015 &ndash; 2017"),
    Paragraph("Isfahan University of Technology &mdash; Isfahan, Iran", org_style),
    Paragraph(
        "I specialize in predicting and modeling stock market behavior, utilizing advanced data analysis and "
        "machine learning techniques to forecast trends and inform investment strategies.",
        body_style,
    ),
    Paragraph(
        'Supervisor: Prof. Farhad Shahbazi '
        '(<link href="mailto:shahbazi@iut.ac.ir">shahbazi@iut.ac.ir</link>)',
        meta_style,
    ),
    Spacer(1, 7),
]))

story.append(KeepTogether([
    entry_header("Bachelor's in Physics", "2011 &ndash; 2015"),
    Paragraph("Isfahan University of Technology &mdash; Isfahan, Iran", org_style),
    Paragraph("Among the top 10% of graduates.", body_style),
]))

# ---------- Patents ----------
section_heading("Patents")
story.append(KeepTogether([
    entry_header(
        "Encoding, Decoding and Integrity Validation Systems for a Security Document with a "
        "Steganography-Encoded Image",
        "Granted Oct. 2025",
    ),
    Paragraph(
        "Inventors: Nuno Gonçalves and Farhad Shadmand &middot; Applicants: Imprensa Nacional Casa da Moeda "
        "and University of Coimbra",
        meta_style,
    ),
    Paragraph(
        "Encoding, decoding and integrity validation systems for a security document with a steganography-encoded "
        "image and methods, computer programs and associated computer-readable data carrier.",
        body_style,
    ),
    Paragraph(
        '<link href="https://patents.google.com/patent/PT117136A/en">PT117136A</link> (Portugal) &middot; '
        '<link href="https://patents.google.com/patent/EP4064095A1/en">EP4064095A1</link> (European Patent Office)',
        meta_style,
    ),
]))

# ---------- Publications ----------
section_heading("Publications")
publications = [
    ("StampOne: Addressing Frequency Balance in Printer-proof Steganography",
     "CVPR (2024)",
     "https://openaccess.thecvf.com/content/CVPR2024W/WMF/html/Shadmand_StampOne_Addressing_Frequency_Balance_in_Printer-proof_Steganography_CVPRW_2024_paper.html",
     "https://farhadsh1992.github.io/StampOne/"),
    ("CodeFace: A Deep Learning Printer-Proof Steganography for Face Portraits",
     "IEEE Access 9 (2021)",
     "https://ieeexplore.ieee.org/document/9634021/",
     None),
    ("StylePuncher: Encoding a Hidden QR Code into Images",
     "ICPRAM (2025)",
     "https://www.scitepress.org/Papers/2025/131908/131908.pdf",
     None),
    ("DocSafe: Towards Practical Print-Proof Image Steganography via Frequency Decomposition and Covariance Alignment",
     "IEEE Access (2026.3680290), 2026",
     "https://doi.org/10.1109/ACCESS.2026.3680290",
     None),
    ("RiemStega: Covariance-based loss for print-proof transmission of data in images",
     "WACV (2025)",
     "https://openaccess.thecvf.com/content/WACV2025/papers/Cruz_RiemStega_Covariance-Based_Loss_for_Print-Proof_Transmission_of_Data_in_Images_WACV_2025_paper.pdf",
     None),
    ("Young Labeled Faces in the Wild (YLFW): A Dataset for Children Faces Recognition",
     "IEEE 18th International Conference on Automatic Face and Gesture Recognition (FG) (2024)",
     "https://arxiv.org/abs/2301.05776",
     None),
    ("MorDeephy: Face Morphing Detection via Fused Classification",
     "12th International Conference on Pattern Recognition Application and Methods (2022)",
     "https://arxiv.org/abs/2208.03110",
     None),
    ("Towards Facial Biometrics for ID Document Validation in Mobile Devices",
     "Applied Sciences 11.13 (2021)",
     "https://doi.org/10.3390/app11136134",
     None),
]
for title, venue, link, code_link in publications:
    story.append(Paragraph('<link href="{}"><u>{}</u></link>'.format(link, title), pub_style))
    venue_line = venue
    if code_link:
        venue_line += ' &middot; <link href="{}"><u>Code</u></link>'.format(code_link)
    story.append(Paragraph(venue_line, pub_venue_style))

doc = SimpleDocTemplate(
    OUT_PATH, pagesize=A4,
    leftMargin=20 * mm, rightMargin=20 * mm,
    topMargin=16 * mm, bottomMargin=16 * mm,
    title="Farhad Shadmand - Resume", author="Farhad Shadmand",
)
doc.build(story)
print("wrote", OUT_PATH)
