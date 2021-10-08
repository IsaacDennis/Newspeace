import { Injectable } from '@angular/core';
import { createAnimation, Animation } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }

  async tabMenuAnimationOpen() {
    const rectA = createAnimation()
      .addElement(document.querySelector('.rectA'))
      .duration(100)
      .fromTo('transform', 'translateX(0)', 'translate(5em)');
    const rectB = createAnimation()
      .addElement(document.querySelector('.rectB'))
      .duration(100)
      .fromTo('transform', 'translateX(0)', 'translate(5em)');
    const rectC = createAnimation()
      .addElement(document.querySelector('.rectC'))
      .duration(100)
      .fromTo('transform', 'translateX(0)', 'translate(5em)');
      await rectA.play();
      await rectB.play();
      await rectC.play();
  }

  async tabMenuAnimationClose() {
    const closeSvg: Animation = createAnimation()
    .addElement(document.querySelector('.icon-close'))
    .duration(300)
    .easing('ease-in-out')
    .keyframes([
      { offset: 0, transform: 'scale(1.5) rotate(0deg)'},
      { offset: 1, transform: 'scale(0) rotate(360deg)'}
    ]);
    const rectA = createAnimation()
    .addElement(document.querySelector('.rectA'))
    .duration(100)
    .fromTo('transform', 'translateX(5em)', 'translate(0)');
    const rectB = createAnimation()
    .addElement(document.querySelector('.rectB'))
    .duration(100)
    .fromTo('transform', 'translateX(5em)', 'translate(0)');
    const rectC = createAnimation()
    .addElement(document.querySelector('.rectC'))
    .duration(100)
    .fromTo('transform', 'translateX(5em)', 'translate(0)');
    await closeSvg.play();
    await rectA.play();
    await rectB.play();
    await rectC.play();
    return closeSvg;
  }

  async arrowBack() {
    const arrowSvg = createAnimation()
    .addElement(document.querySelector('.icon-arrow'))
    .duration(200)
    .keyframes([
      { offset: 0, transform: 'scale(1.5) translateX(0)'},
      { offset: 0.5, transform: 'scale(1.5) translateX(2px)'},
      { offset: 1, transform: 'scale(1.5) translateX(-1px)'},
    ]);
    await arrowSvg.play();
  }

  async acessibilitySpeak() {
    const soundA = createAnimation()
    .addElement(document.querySelector('.soundA'))
    .easing(`ease-out`)
    .duration(1000)
    .keyframes([
      { offset: 0, opacity: '0'},
      { offset: 0.25, opacity: '0'},
      { offset: 0.50, opacity: '0'},
      { offset: 0.75, opacity: '0'},
      { offset: 1, opacity: '1'}
    ]);
    const soundB = createAnimation()
    .addElement(document.querySelector('.soundB'))
    .easing(`ease-in`)
    .duration(1000)
    .keyframes([
      { offset: 0, opacity: '0'},
      { offset: 0.25, opacity: '0'},
      { offset: 0.50, opacity: '1'},
      { offset: 0.75, opacity: '1'},
      { offset: 1, opacity: '1'}
    ]);
    return [soundB, soundA];
  }
}
