
# Gallery Management Guide

## Quick Start

1. **Add your built files** to `/public/gallery/files/`
2. **Update** `src/config/galleryItems.json` with your new item
3. **Deploy** - that's it!

## Adding a New Gallery Item

### 1. Prepare Your Files
- For JavaScript/P5.js: Run `npm build` or your build process
- For Java: Compile to JAR file
- Place the final executable file in `/public/gallery/files/`

### 2. Update Configuration
Edit `src/config/galleryItems.json`:

```json
{
  "items": [
    {
      "title": "My New Game",
      "description": "Description of what it does",
      "type": "JavaScript/P5.js",
      "slug": "my-new-game",
      "fileName": "my-game.js",
      "buildRequired": true,
      "category": "game",
      "tags": ["interactive", "educational"]
    }
  ]
}
```

### 3. Configuration Fields

- **title**: Display name
- **description**: What the item does
- **type**: Technology used (affects icon/color)
- **slug**: URL-friendly identifier
- **fileName**: Actual file name in `/public/gallery/files/`
- **buildRequired**: `true` if users need build tools
- **category**: Optional grouping
- **tags**: Optional search keywords

### 4. Supported Types
- `JavaScript/P5.js` - Pink badge, play icon
- `Java Swing` - Orange badge, code icon  
- `Python` - Blue badge, code icon
- Add more in `Gallery.tsx` as needed

## File Organization

```
public/gallery/files/
├── p5-game.js
├── swing-demo.jar
├── python-script.py
└── your-new-file.ext
```

## No Code Changes Needed!
Once set up, you only need to:
1. Add files to `/public/gallery/files/`
2. Update the JSON config
3. Deploy

The gallery page will automatically show your new items!
