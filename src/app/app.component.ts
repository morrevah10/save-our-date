import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroOverlayComponent } from './intro-overlay/intro-overlay.component';

// import { RouterOutlet } from '@angular/router';

import gsap from 'gsap';
import moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,IntroOverlayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  // יעד: 28.08.2026 12:00 (ישראל)
  private readonly TARGET_ISO = '2026-08-28T12:00:00';
  private readonly TZ = 'Asia/Jerusalem';

  // מחרוזות נוכחיות (2 ספרות לכל יחידה)
  moStr = '00';
  dStr = '00';
  hStr = '00';
  mStr = '00';
  sStr = '00';
  showIntro = true;

  // === Calendar links ===

// חשוב: ב-GitHub Pages הנתיב צריך לכלול את שם הריפו
icsUrl = '/save-our-date/calendar.ics';

// Google Calendar (פותח דף הוספה)
googleCalendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Mor%20%26%20Batel%20wedding%F0%9F%92%8D' +
  '&dates=20260828T090000Z/20260828T140000Z' +
  '&details=Save%20the%20date' +
  '&location=%D7%90%D7%9C%D7%94%20-%20%D7%92%D7%9F%20%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D%20%D7%91%D7%A0%D7%A1%20%D7%A6%D7%99%D7%95%D7%A0%D7%94%2C%20%D7%94%D7%90%D7%9C%D7%95%D7%A4%D7%99%D7%9D%2C%20%D7%A0%D7%A1%20%D7%A6%D7%99%D7%95%D7%A0%D7%94';

// Outlook.com
outlookCalendarUrl =
  'https://outlook.live.com/calendar/0/deeplink/compose' +
  '?subject=Mor%20%26%20Batel%20wedding%F0%9F%92%8D' +
  '&body=Save%20the%20date' +
  '&location=%D7%90%D7%9C%D7%94%20-%20%D7%92%D7%9F%20%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D%20%D7%91%D7%A0%D7%A1%20%D7%A6%D7%99%D7%95%D7%A0%D7%94%2C%20%D7%94%D7%90%D7%9C%D7%95%D7%A4%D7%99%D7%9D%2C%20%D7%A0%D7%A1%20%D7%A6%D7%99%D7%95%D7%A0%D7%94' +
  '&startdt=2026-08-28T12:00:00' +
  '&enddt=2026-08-28T17:00:00';

addToCalendar(): void {
  const ua = navigator.userAgent || '';

  const isAppleDevice = /iPhone|iPad|iPod|Macintosh/.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  // Apple + Safari -> ICS, אחרת -> Google
  const urlToOpen = (isAppleDevice && isSafari) ? this.icsUrl : this.googleCalendarUrl;

  window.open(urlToOpen, '_blank', 'noopener');
}

onIntroDone(): void {
  this.showIntro = false;
}

  // מחרוזות קודמות (2 ספרות) — בשביל שכבת prev
  prevMoStr = '00';
  prevDStr = '00';
  prevHStr = '00';
  prevMStr = '00';
  prevSStr = '00';

  // איזה עמודות (0..9) עושות אנימציה כרגע
  animCols: boolean[] = Array(10).fill(false);

  private timerId: number | null = null;

  ngOnInit(): void {
    // אתחול ללא אנימציה
    this.tick(false);
    this.timerId = window.setInterval(() => this.tick(true), 1000);
  }

  ngAfterViewInit(): void {
    this.createEntranceAnimation();
  }

  ngOnDestroy(): void {
    if (this.timerId) window.clearInterval(this.timerId);
  }

  private createEntranceAnimation(): void {
    const tl = gsap.timeline();

    gsap.set(['h1', '.date p', '.location', '.save-our-date', '.countdown', '.image-container'], {
      opacity: 0,
      y: 50,
    });

    gsap.set(['.mor-line', '.date-line'], { scaleY: 0 });
    gsap.set('.calendar-icon', { opacity: 0, scale: 0.5 });
    gsap.set('.mor', { x: 50 });
    gsap.set('.batel', { x: -50 });
    gsap.set('.image-container', { y: 100, opacity: 0 });

    tl.to('h1', { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' })
      .to('.mor-line', { scaleY: 1, duration: 1.2, ease: 'power2.out' }, '-=0.5')
      .to('.date-line', { scaleY: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8')
      .to('.mor', { x: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3')
      .to('.batel', { x: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
      .to('.date p', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.4')
      .to('.location', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
      .to('.save-our-date', { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.75)' }, '-=0.2')
      .to('.countdown', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .to('.calendar-icon', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3')
      .to('.image-container', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=0.3');
  }

  private tick(doAnimate: boolean): void {
    if (doAnimate) {
      this.prevMoStr = this.moStr;
      this.prevDStr = this.dStr;
      this.prevHStr = this.hStr;
      this.prevMStr = this.mStr;
      this.prevSStr = this.sStr;
    }

    const now = moment().tz(this.TZ);
    const target = moment.tz(this.TARGET_ISO, this.TZ);

    if (now.isSameOrAfter(target)) {
      this.moStr = this.dStr = this.hStr = this.mStr = this.sStr = '00';
      this.prevMoStr = this.prevDStr = this.prevHStr = this.prevMStr = this.prevSStr = '00';
      return;
    }

    // חודשים קלנדריים
    let months = target.diff(now, 'months');
    let anchor = now.clone().add(months, 'months');

    if (anchor.isAfter(target)) {
      months -= 1;
      anchor = now.clone().add(months, 'months');
    }

    const dur = moment.duration(target.diff(anchor));
    const totalSeconds = Math.floor(dur.asSeconds());

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const nextMo = String(months).padStart(2, '0');
    const nextD = String(days).padStart(2, '0');
    const nextH = String(hours).padStart(2, '0');
    const nextM = String(minutes).padStart(2, '0');
    const nextS = String(seconds).padStart(2, '0');

    if (doAnimate) {
      const prevDigits = [
        this.prevMoStr[0], this.prevMoStr[1],
        this.prevDStr[0],  this.prevDStr[1],
        this.prevHStr[0],  this.prevHStr[1],
        this.prevMStr[0],  this.prevMStr[1],
        this.prevSStr[0],  this.prevSStr[1],
      ];

      const nextDigits = [
        nextMo[0], nextMo[1],
        nextD[0],  nextD[1],
        nextH[0],  nextH[1],
        nextM[0],  nextM[1],
        nextS[0],  nextS[1],
      ];

      nextDigits.forEach((d, i) => {
        if (d !== prevDigits[i]) {
          this.animCols[i] = true;
          window.setTimeout(() => (this.animCols[i] = false), 500);
        }
      });
    }

    this.moStr = nextMo;
    this.dStr = nextD;
    this.hStr = nextH;
    this.mStr = nextM;
    this.sStr = nextS;
  }
}