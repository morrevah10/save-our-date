import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-intro-overlay',
  standalone: true,
  templateUrl: './intro-overlay.component.html',
  styleUrls: ['./intro-overlay.component.scss'],
})
export class IntroOverlayComponent implements AfterViewInit {
  @Output() done = new EventEmitter<void>();

  @ViewChild('left', { static: true }) left!: ElementRef<HTMLDivElement>;
  @ViewChild('right', { static: true }) right!: ElementRef<HTMLDivElement>;
  @ViewChild('wrap', { static: true }) wrap!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const leftEl = this.left.nativeElement;
    const rightEl = this.right.nativeElement;
    const wrapEl = this.wrap.nativeElement;

    // מצב יציב התחלתי
    gsap.set(wrapEl, { opacity: 1 });
    gsap.set([leftEl, rightEl], { x: 0, y: 0, opacity: 1, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      delay: 2,
      onComplete: () => this.done.emit(),
    });

    // 1) להפוך חיתוך אנכי לאלכסוני
    tl.to(leftEl, {
      clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)',
      duration: 0.35,
      ease: 'power2.inOut',
    })
    .to(
      rightEl,
      {
        clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
        duration: 0.35,
        ease: 'power2.inOut',
      },
      '<'
    )

    // 2) לזוז החוצה בכיוון האלכסון
    .to(leftEl, {
      x: '-120vw',
      y: '-120vh',
      duration: 1.6,
      ease: 'power2.inOut',
    })
    .to(
      rightEl,
      {
        x: '120vw',
        y: '120vh',
        duration: 1.6,
        ease: 'power2.inOut',
      },
      '<'
    )
    .to(wrapEl, { opacity: 0, duration: 0.15 }, '-=0.1');
  }

  googleCalendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Save%20the%20Date' +
  '&dates=20260828T090000Z/20260828T140000Z' +
  '&details=Save%20the%20date' +
  '&location=Tel%20Aviv';

outlookCalendarUrl =
  'https://outlook.live.com/calendar/0/deeplink/compose' +
  '?subject=Save%20the%20Date' +
  '&body=Save%20the%20date' +
  '&location=Tel%20Aviv' +
  '&startdt=2026-08-28T12:00:00' +
  '&enddt=2026-08-28T17:00:00';

icsUrl = '/save-our-date/calendar.ics'; // שים לב לבייס־הרף של GitHub Pages

addToCalendar(e: MouseEvent) {
  e.preventDefault();

  const ua = navigator.userAgent || '';
  const isAppleDevice = /iPhone|iPad|iPod|Macintosh/.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  // ברירת מחדל: אפל -> ICS, אחרת -> גוגל
  const urlToOpen = (isAppleDevice && isSafari) ? this.icsUrl : this.googleCalendarUrl;

  // פותח בטאב חדש (פחות נחסם)
  window.open(urlToOpen, '_blank', 'noopener');
}

}
