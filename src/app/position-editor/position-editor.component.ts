import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ElementPosition {
  name: string;
  displayName: string;
  xVar: string;
  yVar: string;
  sizeVar: string;
  x: number;
  y: number;
  size: number;
  hasX: boolean;
  hasY: boolean;
  hasSize: boolean;
  minSize: number;
  maxSize: number;
}

@Component({
  selector: 'app-position-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss'],
})
export class PositionEditorComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  showGrid = false;
  showSafeZone = false;

  elements: ElementPosition[] = [
    {
      name: 'calendar',
      displayName: '📅 Calendar Icon',
      xVar: '--calendar-x',
      yVar: '--calendar-y',
      sizeVar: '--calendar-size',
      x: 18,
      y: 24,
      size: 120,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 50,
      maxSize: 200,
    },
    {
      name: 'bm-letters',
      displayName: '🔤 BM Letters',
      xVar: '--mb-x',
      yVar: '--mb-y',
      sizeVar: '--mb-size',
      x: 338,
      y: 18,
      size: 46,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 20,
      maxSize: 80,
    },
    {
      name: 'new-date',
      displayName: '📅 New Date (28.08.26)',
      xVar: '--new-date-x',
      yVar: '--new-date-y',
      sizeVar: '--new-date-size',
      x: 210,
      y: 180,
      size: 28,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 16,
      maxSize: 50,
    },
    {
      name: 'save-date',
      displayName: '💝 Save the date',
      xVar: '--save-date-x',
      yVar: '--save-date-y',
      sizeVar: '--save-date-size',
      x: 201,
      y: 235,
      size: 64,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 30,
      maxSize: 100,
    },
    {
      name: 'names',
      displayName: '👫 Names (Batel & Mor)',
      xVar: '--names-x',
      yVar: '--names-y',
      sizeVar: '--names-size',
      x: 201,
      y: 270,
      size: 32,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 20,
      maxSize: 60,
    },
    {
      name: 'countdown',
      displayName: '⏱️ Countdown',
      xVar: '--countdown-x',
      yVar: '--countdown-y',
      sizeVar: '--countdown-size',
      x: 201,
      y: 340,
      size: 26,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 16,
      maxSize: 50,
    },
    {
      name: 'location',
      displayName: '📍 Location (at Ella, Nes Tziona)',
      xVar: '--location-x',
      yVar: '--location-y',
      sizeVar: '--location-size',
      x: 280,
      y: 600,
      size: 20,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 12,
      maxSize: 40,
    },
    {
      name: 'image',
      displayName: '🖼️ Couple Image',
      xVar: '--image-x',
      yVar: '--image-y',
      sizeVar: '--image-width',
      x: 0,
      y: 500,
      size: 1.16,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 0.5,
      maxSize: 2,
    },
    {
      name: 'intro-mb',
      displayName: '🎬 Intro MB Letters',
      xVar: '--intro-mb-x',
      yVar: '--intro-mb-y',
      sizeVar: '--intro-mb-size',
      x: 0,
      y: 0,
      size: 120,
      hasX: true,
      hasY: true,
      hasSize: true,
      minSize: 60,
      maxSize: 250,
    },
  ];

  ngOnInit(): void {
    this.loadCurrentPositions();
  }

  private loadCurrentPositions(): void {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    this.elements.forEach((el) => {
      if (el.hasX) {
        const xValue = computedStyle.getPropertyValue(el.xVar).trim();
        if (xValue) {
          el.x = parseFloat(xValue);
        }
      }
      if (el.hasY) {
        const yValue = computedStyle.getPropertyValue(el.yVar).trim();
        if (yValue) {
          el.y = parseFloat(yValue);
        }
      }
      if (el.hasSize) {
        const sizeValue = computedStyle.getPropertyValue(el.sizeVar).trim();
        if (sizeValue) {
          el.size = parseFloat(sizeValue);
        }
      }
    });
  }

  toggleGrid(): void {
    this.showGrid = !this.showGrid;
    this.updateOverlay();
  }

  toggleSafeZone(): void {
    this.showSafeZone = !this.showSafeZone;
    this.updateOverlay();
  }

  updatePosition(element: ElementPosition): void {
    const root = document.documentElement;
    if (element.hasX) {
      root.style.setProperty(element.xVar, element.x.toString());
    }
    if (element.hasY) {
      root.style.setProperty(element.yVar, element.y.toString());
    }
    if (element.hasSize) {
      root.style.setProperty(element.sizeVar, element.size.toString());
    }
  }

  private updateOverlay(): void {
    const root = document.documentElement;
    root.style.setProperty('--show-grid', this.showGrid ? '1' : '0');
    root.style.setProperty('--show-safe-zone', this.showSafeZone ? '1' : '0');
  }

  exportCSS(): void {
    let css = '/* ========================================\n';
    css += '   📋 COPY THESE VALUES TO styles.scss\n';
    css += '   Paste inside :root { ... } section\n';
    css += '======================================== */\n\n';

    this.elements.forEach((el) => {
      css += `/* ${el.displayName} */\n`;
      if (el.hasX) {
        css += `  ${el.xVar}: ${el.x};\n`;
      }
      if (el.hasY) {
        css += `  ${el.yVar}: ${el.y};\n`;
      }
      if (el.hasSize) {
        css += `  ${el.sizeVar}: ${el.size};\n`;
      }
      css += '\n';
    });

    css += '/* ========================================\n';
    css += '   💡 INSTRUCTIONS:\n';
    css += '   1. Open styles.scss\n';
    css += '   2. Find :root {\n';
    css += '   3. Replace the old values with these\n';
    css += '   4. Save the file (Ctrl+S / Cmd+S)\n';
    css += '   5. Refresh your browser\n';
    css += '======================================== */';

    navigator.clipboard.writeText(css).then(() => {
      alert(
        '✅ CSS Variables Copied!\n\n' +
          '📝 Next Steps:\n' +
          '1. Open styles.scss\n' +
          '2. Find :root { at the top\n' +
          '3. Replace values with what you copied\n' +
          '4. Save file\n' +
          '5. Refresh browser\n\n' +
          'Your changes will be permanent!',
      );
    });
  }

  resetToDefaults(): void {
    if (
      confirm(
        '⚠️ Reset ALL positions and sizes to defaults?\n\nThis will undo your changes until you refresh the page.',
      )
    ) {
      this.elements = [
        {
          name: 'calendar',
          displayName: '📅 Calendar Icon',
          xVar: '--calendar-x',
          yVar: '--calendar-y',
          sizeVar: '--calendar-size',
          x: 18,
          y: 24,
          size: 120,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 50,
          maxSize: 200,
        },
        {
          name: 'bm-letters',
          displayName: '🔤 BM Letters',
          xVar: '--mb-x',
          yVar: '--mb-y',
          sizeVar: '--mb-size',
          x: 338,
          y: 18,
          size: 46,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 20,
          maxSize: 80,
        },
        {
          name: 'new-date',
          displayName: '📅 New Date (28.08.26)',
          xVar: '--new-date-x',
          yVar: '--new-date-y',
          sizeVar: '--new-date-size',
          x: 210,
          y: 180,
          size: 28,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 16,
          maxSize: 50,
        },
        {
          name: 'save-date',
          displayName: '💝 Save the date',
          xVar: '--save-date-x',
          yVar: '--save-date-y',
          sizeVar: '--save-date-size',
          x: 201,
          y: 235,
          size: 64,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 30,
          maxSize: 100,
        },
        {
          name: 'names',
          displayName: '👫 Names (Batel & Mor)',
          xVar: '--names-x',
          yVar: '--names-y',
          sizeVar: '--names-size',
          x: 201,
          y: 270,
          size: 32,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 20,
          maxSize: 60,
        },
        {
          name: 'countdown',
          displayName: '⏱️ Countdown',
          xVar: '--countdown-x',
          yVar: '--countdown-y',
          sizeVar: '--countdown-size',
          x: 201,
          y: 340,
          size: 26,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 16,
          maxSize: 50,
        },
        {
          name: 'location',
          displayName: '📍 Location (at Ella, Nes Tziona)',
          xVar: '--location-x',
          yVar: '--location-y',
          sizeVar: '--location-size',
          x: 280,
          y: 600,
          size: 20,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 12,
          maxSize: 40,
        },
        {
          name: 'image',
          displayName: '🖼️ Couple Image',
          xVar: '--image-x',
          yVar: '--image-y',
          sizeVar: '--image-width',
          x: 0,
          y: 500,
          size: 1.16,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 0.5,
          maxSize: 2,
        },
        {
          name: 'intro-mb',
          displayName: '🎬 Intro MB Letters',
          xVar: '--intro-mb-x',
          yVar: '--intro-mb-y',
          sizeVar: '--intro-mb-size',
          x: 0,
          y: 0,
          size: 120,
          hasX: true,
          hasY: true,
          hasSize: true,
          minSize: 60,
          maxSize: 250,
        },
      ];

      this.elements.forEach((el) => this.updatePosition(el));
    }
  }

  closeEditor(): void {
    const userWantsToSave = confirm(
      '⚠️ Your changes are TEMPORARY!\n\n' +
        '💡 To save permanently:\n' +
        '1. Click "💾 Copy CSS to Save"\n' +
        '2. Paste into styles.scss\n' +
        '3. Save styles.scss\n\n' +
        'Close editor anyway?',
    );

    if (userWantsToSave) {
      this.close.emit();
    }
  }
}
