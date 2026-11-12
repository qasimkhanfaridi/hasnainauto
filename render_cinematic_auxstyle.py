import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio
import subprocess
import imageio_ffmpeg

WIDTH = 1920
HEIGHT = 1080
FPS = 30
TEMP_VIDEO = r"C:\Users\qasim.faridi.LT-LE-126\Desktop\temp_cinema.mp4"
FINAL_VIDEO = r"C:\Users\qasim.faridi.LT-LE-126\Desktop\hasnain_auto_cinematic.mp4"
AUDIO_PATH = r"C:\Users\qasim.faridi.LT-LE-126\Desktop\soundtrack.aac"
BASE_DIR = r"C:\Users\qasim.faridi.LT-LE-126\.gemini\antigravity\scratch\hasnain-auto-accessories\public\images\products"

def get_font(size, bold=True):
    name = "arialbd.ttf" if bold else "arial.ttf"
    try:
        return ImageFont.truetype(name, size)
    except:
        return ImageFont.load_default()

def draw_hud_pointer(draw, target_xy, text_primary, text_sub, progress, color=(245, 158, 11)):
    """
    Renders the exact Auxleds-style HUD pointer with circular anchor,
    elbow line, pulsing dot, and bold high-contrast text tags.
    """
    tx, ty = target_xy
    # Target anchor circle
    r = 8
    draw.ellipse([tx - r, ty - r, tx + r, ty + r], outline=(255, 255, 255), width=3)
    draw.ellipse([tx - 4, ty - 4, tx + 4, ty + 4], fill=color)

    # Animate line expansion based on progress (0 to 1 in first 0.5s)
    line_p = min(1.0, progress * 2.5)
    
    # Leader line: angled up/left or up/right
    is_left = tx > WIDTH // 2
    dx = -120 if is_left else 120
    dy = -80
    
    elbow_x = tx + int(dx * line_p)
    elbow_y = ty + int(dy * line_p)
    draw.line([tx, ty, elbow_x, elbow_y], fill=(255, 255, 255), width=3)
    
    if line_p >= 0.8:
        horiz_len = 160 if is_left else 160
        end_x = elbow_x - horiz_len if is_left else elbow_x + horiz_len
        draw.line([elbow_x, elbow_y, end_x, elbow_y], fill=(255, 255, 255), width=3)
        
        # Text block - ensure text never overlaps the pointer line
        f_main = get_font(40, bold=True)
        f_sub = get_font(28, bold=True)
        
        # Calculate text width accurately to align correctly
        t1_box = draw.textbbox((0, 0), text_primary, font=f_main)
        t1_w = t1_box[2] - t1_box[0]
        
        if is_left:
            text_x = end_x - t1_w - 20
        else:
            text_x = end_x + 20
            
        text_y = elbow_y - 38
        
        # Text drop shadow for high contrast
        draw.text((text_x + 2, text_y + 2), text_primary, font=f_main, fill=(0, 0, 0))
        draw.text((text_x, text_y), text_primary, font=f_main, fill=color)
        
        draw.text((text_x + 2, text_y + 44), text_sub, font=f_sub, fill=(0, 0, 0))
        draw.text((text_x, text_y + 42), text_sub, font=f_sub, fill=(255, 255, 255))

def render_cinematic_scene(img_path, target_xy, t_primary, t_sub, duration_sec, tag_color=(245, 158, 11), zoom_in=True):
    img = Image.open(img_path).convert("RGB")
    
    # Fit & fill 1920x1080 maintaining aspect ratio
    iw, ih = img.size
    scale = max(WIDTH / iw, HEIGHT / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    base_img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    
    # Center crop to 1920x1080
    crop_x = (nw - WIDTH) // 2
    crop_y = (nh - HEIGHT) // 2
    base_img = base_img.crop((crop_x, crop_y, crop_x + WIDTH, crop_y + HEIGHT))
    
    total_frames = int(duration_sec * FPS)
    frames = []
    
    for i in range(total_frames):
        p = i / total_frames
        
        # Subtle cinematic pan / slow zoom (1.00 -> 1.05)
        z = (1.0 + 0.05 * p) if zoom_in else (1.05 - 0.05 * p)
        zw, zh = int(WIDTH * z), int(HEIGHT * z)
        frame_img = base_img.resize((zw, zh), Image.Resampling.BILINEAR)
        
        # Crop back to 1920x1080
        zx = (zw - WIDTH) // 2
        zy = (zh - HEIGHT) // 2
        frame_canvas = frame_img.crop((zx, zy, zx + WIDTH, zy + HEIGHT))
        
        # Add subtle top & bottom cinematic letterbox bar (like anamorphic film)
        draw = ImageDraw.Draw(frame_canvas)
        draw.rectangle([0, 0, WIDTH, 35], fill=(0, 0, 0))
        draw.rectangle([0, HEIGHT - 35, WIDTH, HEIGHT], fill=(0, 0, 0))
        
        # Small watermark top-right
        f_wm = get_font(18, bold=True)
        draw.text((WIDTH - 240, 48), "HASNAIN AUTO STUDIO", font=f_wm, fill=(180, 180, 180))
        
        # Draw the animated Auxleds-style HUD Callout Pointer
        draw_hud_pointer(draw, target_xy, t_primary, t_sub, p, color=tag_color)
        
        frames.append(np.array(frame_canvas))
        
    return frames

def render_logo_outro(duration_sec=3.5):
    total_frames = int(duration_sec * FPS)
    frames = []
    
    f_hasnain = get_font(90, bold=True)
    f_auto = get_font(90, bold=True)
    f_sub = get_font(32, bold=True)
    f_loc = get_font(24, bold=False)
    
    for i in range(total_frames):
        p = i / total_frames
        alpha = min(1.0, p * 2.0)
        
        canvas = Image.new("RGB", (WIDTH, HEIGHT), (5, 6, 9))
        draw = ImageDraw.Draw(canvas)
        
        # Center glow / flare
        cx, cy = WIDTH // 2, HEIGHT // 2 - 40
        
        # Draw Title
        draw.text((cx - 320, cy - 60), "HASNAIN", font=f_hasnain, fill=(255, 255, 255))
        draw.text((cx + 120, cy - 60), "AUTO", font=f_auto, fill=(220, 38, 38))
        
        # Red underline
        draw.line([cx - 320, cy + 50, cx + 380, cy + 50], fill=(220, 38, 38), width=4)
        
        # Tagline
        draw.text((cx - 280, cy + 75), "PERFORMANCE LIGHTING & BESPOKE INTERIORS", font=f_sub, fill=(245, 158, 11))
        draw.text((cx - 260, cy + 130), "KASHMIR ROAD, SADDAR RAWALPINDI • WHATSAPP: 0312-5127096", font=f_loc, fill=(160, 160, 160))
        
        frames.append(np.array(canvas))
        
    return frames

print("Generating 1920x1080 Cinematic Commercial matching Auxleds style...")
writer = imageio.get_writer(TEMP_VIDEO, fps=FPS, codec="libx264", quality=9)

scenes = [
    {
        "img": os.path.join(BASE_DIR, "laser-headlight-beam.jpg"),
        "target": (1240, 680),
        "title": "HYPERBEAM LED",
        "sub": "20,000 LM CUTOFF",
        "duration": 4.0,
        "color": (245, 158, 11),
        "zoom": True,
    },
    {
        "img": os.path.join(BASE_DIR, "biled-fog-projectors.jpg"),
        "target": (780, 520),
        "title": "BI-LED LASER",
        "sub": "FOG PROJECTORS",
        "duration": 4.0,
        "color": (6, 182, 212),
        "zoom": False,
    },
    {
        "img": os.path.join(BASE_DIR, "symphony-ambient-led.jpg"),
        "target": (1260, 350),
        "title": "DYNAMIC SYMPHONY",
        "sub": "64-COLOR AMBIENT",
        "duration": 4.0,
        "color": (168, 85, 247),
        "zoom": True,
    },
    {
        "img": os.path.join(BASE_DIR, "seat-cover-floor-mat-combo.jpg"),
        "target": (980, 480),
        "title": "BESPOKE STITCH",
        "sub": "LEATHER + 7D MATS",
        "duration": 3.5,
        "color": (239, 68, 68),
        "zoom": False,
    },
]

for s_idx, sc in enumerate(scenes):
    print(f"Rendering Cinematic Scene {s_idx+1}/{len(scenes)}: {sc['title']}...")
    f_list = render_cinematic_scene(
        sc["img"], sc["target"], sc["title"], sc["sub"], sc["duration"], sc["color"], sc["zoom"]
    )
    for f in f_list:
        writer.append_data(f)

print("Rendering Logo Outro Scene...")
outro_frames = render_logo_outro(duration_sec=3.2)
for f in outro_frames:
    writer.append_data(f)

writer.close()
print("Base video rendered! Merging with original Auxleds electronic soundtrack...")

# Merge with soundtrack using FFmpeg
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
cmd = [
    ffmpeg_exe, "-y",
    "-i", TEMP_VIDEO,
    "-i", AUDIO_PATH,
    "-c:v", "copy",
    "-c:a", "aac",
    "-shortest",
    FINAL_VIDEO
]
subprocess.run(cmd, check=True)

if os.path.exists(TEMP_VIDEO):
    try:
        os.remove(TEMP_VIDEO)
    except:
        pass

print(f"FINAL CINEMATIC VIDEO COMPLETE: {FINAL_VIDEO}")
