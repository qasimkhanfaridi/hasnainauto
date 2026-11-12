import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio

WIDTH = 1080
HEIGHT = 1920
FPS = 30

OUTPUT_PATH = r"C:\Users\qasim.faridi.LT-LE-126\Desktop\hasnain_auto_promo.mp4"
BASE_DIR = r"C:\Users\qasim.faridi.LT-LE-126\.gemini\antigravity\scratch\hasnain-auto-accessories\public\images\products"

def get_font(size):
    try:
        return ImageFont.truetype("arialbd.ttf", size)
    except:
        try:
            return ImageFont.truetype("arial.ttf", size)
        except:
            return ImageFont.load_default()

def create_slide_frame(img_name, top_tag, title_line1, title_line2, features, bottom_cta, t_progress):
    img_path = os.path.join(BASE_DIR, img_name)
    canvas = Image.new("RGB", (WIDTH, HEIGHT), (12, 14, 20))
    draw = ImageDraw.Draw(canvas)
    
    # 1. Top Header Banner
    draw.rectangle([0, 0, WIDTH, 130], fill=(7, 9, 13))
    f_logo = get_font(48)
    f_sub = get_font(24)
    draw.text((60, 25), "HASNAIN", font=f_logo, fill=(255, 255, 255))
    draw.text((295, 25), "AUTO", font=f_logo, fill=(220, 38, 38))
    draw.text((60, 82), "AZHAR SHAHEED AUTO MARKET, KASHMIR ROAD, SADDAR RAWALPINDI", font=f_sub, fill=(170, 175, 185))

    # 2. Tag Pill (measured to fit text)
    f_tag = get_font(28)
    tag_bbox = draw.textbbox((0, 0), top_tag, font=f_tag)
    tag_w = tag_bbox[2] - tag_bbox[0] + 48
    draw.rounded_rectangle([60, 160, 60 + tag_w, 215], radius=14, fill=(220, 38, 38))
    draw.text((84, 172), top_tag, font=f_tag, fill=(255, 255, 255))

    # 3. Main Headlines (calibrated font sizes to prevent truncation)
    f_t1 = get_font(56)
    f_t2 = get_font(52)
    draw.text((60, 240), title_line1, font=f_t1, fill=(255, 255, 255))
    draw.text((60, 315), title_line2, font=f_t2, fill=(245, 158, 11))

    # 4. Product Image Card (with subtle dynamic zoom)
    if os.path.exists(img_path):
        prod = Image.open(img_path).convert("RGB")
        zoom = 1.0 + 0.04 * t_progress
        target_w = int(960 * zoom)
        target_h = int(660 * zoom)
        prod = prod.resize((target_w, target_h), Image.Resampling.LANCZOS)
        left = (target_w - 960) // 2
        top = (target_h - 660) // 2
        prod = prod.crop((left, top, left + 960, top + 660))
        
        card = Image.new("RGB", (980, 680), (22, 26, 36))
        card.paste(prod, (10, 10))
        canvas.paste(card, (50, 410))
        draw.rounded_rectangle([50, 410, 1030, 1090], radius=22, outline=(220, 38, 38), width=3)

    # 5. Feature Bullets below image
    f_feat = get_font(34)
    y_feat = 1130
    for feat in features:
        draw.rounded_rectangle([50, y_feat, 1030, y_feat + 72], radius=14, fill=(20, 24, 34), outline=(45, 52, 68), width=2)
        # Green checkmark
        draw.text((75, y_feat + 18), "[OK]", font=get_font(28), fill=(37, 211, 102))
        draw.text((150, y_feat + 18), feat, font=f_feat, fill=(255, 255, 255))
        y_feat += 88

    # 6. Bottom WhatsApp & CTA Box
    draw.rounded_rectangle([40, 1660, 1040, 1840], radius=28, fill=(37, 211, 102))
    f_cta_main = get_font(46)
    f_cta_sub = get_font(30)
    draw.text((95, 1685), "ORDER ON WHATSAPP: 0312-5127096", font=f_cta_main, fill=(0, 0, 0))
    draw.text((95, 1755), bottom_cta, font=f_cta_sub, fill=(15, 25, 18))

    return np.array(canvas)

slides_data = [
    {
        "img": "laser-headlight-beam.jpg",
        "tag": "UP TO 8X BRIGHTER",
        "t1": "LIGHT UP THE ROAD",
        "t2": "20,000 LM HYPERBEAM LEDS",
        "feats": [
            "350+ Meters Daylight Night Road Throw",
            "Razor-Sharp Anti-Glare Cutoff (Zero Glare)",
            "1-Year Direct Replacement Warranty",
            "100% Plug & Play (Zero Wire Cutting)",
        ],
        "cta": "Cash on Delivery Nationwide • Free Saddar Fitting",
        "duration": 4.0,
    },
    {
        "img": "biled-fog-projectors.jpg",
        "tag": "ALL-WEATHER PENETRATION",
        "t1": "3.0 INCH BI-LED PROJECTOR",
        "t2": "LASER FOG LIGHT UPGRADE",
        "feats": [
            "Dual Beam: 3000K Amber + 6000K White",
            "Penetrates Thick Winter Fog & Highway Rain",
            "160 Degree Ultra-Wide Road Beam Spread",
            "Direct Fit for Corolla, Civic, Swift, Alto & Sportage",
        ],
        "cta": "Kashmir Road Saddar • WhatsApp: 0312-5127096",
        "duration": 4.0,
    },
    {
        "img": "symphony-ambient-led.jpg",
        "tag": "LUXURY CABIN FEEL",
        "t1": "64-COLOR SMART SYMPHONY",
        "t2": "DYNAMIC AMBIENT LIGHTING",
        "feats": [
            "Ultra-Thin 1mm Acrylic Guide (OEM Concealed)",
            "Real-Time Music Rhythm & Acoustic Sync",
            "Smart iOS / Android App + Wireless Remote",
            "200+ Dynamic Flowing & Chasing Color Modes",
        ],
        "cta": "Transform Your Car Interior • Order on WhatsApp",
        "duration": 4.0,
    },
    {
        "img": "seat-cover-floor-mat-combo.jpg",
        "tag": "BESPOKE INTERIOR VIP PACK",
        "t1": "LEATHER SEAT COVERS",
        "t2": "+ 7D DEEP-DISH FLOOR MATS",
        "feats": [
            "Custom Laser-Tailored for Every Pakistani Car",
            "Japanese Scratchless Leatherette (Double Stitch)",
            "7D Waterproof Deep-Dish Floor Protection",
            "Save 15% on Complete Interior Bundles",
        ],
        "cta": "hasnainauto.vercel.app • Call / WhatsApp Now",
        "duration": 4.0,
    },
]

print("Re-rendering optimized 1080x1920 video for Hasnain Auto...")
writer = imageio.get_writer(OUTPUT_PATH, fps=FPS, codec="libx264", quality=8)

for s_idx, slide in enumerate(slides_data):
    total_frames = int(slide["duration"] * FPS)
    print(f"Rendering Slide {s_idx+1}/{len(slides_data)}: {slide['t1']} ({total_frames} frames)...")
    for f in range(total_frames):
        t_prog = f / total_frames
        frame = create_slide_frame(
            slide["img"],
            slide["tag"],
            slide["t1"],
            slide["t2"],
            slide["feats"],
            slide["cta"],
            t_prog
        )
        writer.append_data(frame)

writer.close()
print(f"SUCCESS: Video exported to {OUTPUT_PATH}")
