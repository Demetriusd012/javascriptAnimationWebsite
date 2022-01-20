let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Intitate Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll('.slide');
  const nav = document.querySelector('.navHeader');
  //Loop over each slide
  sliders.forEach((slide,index,slides) => {
    const revealImg = slide.querySelector('.revealImg');
    const img = slide.querySelector('img');
    const revealText = slide.querySelector('.revealText');
    //GSAP
    //element,time,object w/ properties I want to change
    // gsap.to(revealImg, 1,{ scale:'1.2',x: '120%' });
    // gsap.to(img, 1,{ scale:"1.2" });
    //Timeline chain together multiple animations
    const sliderTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power2.inOut' }
    })
    sliderTl.fromTo(revealImg, { x: '0%',scale:'2' }, { x: '200%',scale:'1.5' });
    sliderTl.fromTo(img, { scale: '1.5' }, { scale: '1' }, '-=1');
    sliderTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=.75');
    sliderTl.fromTo(nav, { y: '-100%'}, { y: '0%'}, '-=.5');
   //Animate when Scolling
    //Create A Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: .25,
      reverse: false
    })
      .setTween(sliderTl)
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
      name:'slide'})
      .addTo(controller);
    
    
    //New animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: .5 });
    pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' },'-=0.5');
    //Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0
      
    })
      .addIndicators({
      colorStart: 'white',
      colorTrigger: 'white',
      name: 'page',
      indent:200
      })
      .setPin(slide,{pushFollowers:false})
      .setTween(pageTl)
      .addTo(controller)

  })
}
const mouse = document.querySelector('.cursor');
const mouseText = mouse.querySelector('span');
const burger = document.querySelector('.burger');

function cursor(event) {
  // console.log(event);
  mouse.style.top = event.pageY + 'px';
  mouse.style.left = event.pageX + 'px';
}
function activeCursor(event) {
  const item = event.target;
  console.log(item);
  if (item.id === 'logo' || item.classList.contains('burger')){
    mouse.classList.add('navActive');
  }else{
    mouse.classList.remove('navActive');
  }
  if (item.classList.contains('explore')) {
    mouse.classList.add('exploreActive');
    gsap.to('.titleSwipe', 1, { y: '0%' });
    mouseText.innerText = 'Tap';
  } else {
    mouse.classList.remove('exploreActive');
    mouseText.innerText = '';
    gsap.to('.titleSwipe', 1, { y: '100%' });
    
  }
}

function navToggle(event) {
  if (!event.target.classList.contains('active')) {
    event.target.classList.add('active');
    gsap.to('.line1', .5, { rotate: '45',y:5, background:'black'});
    gsap.to('.line2', .5, { rotate: '-45', y:-5, background:'black' });
    gsap.to('#logo', 1, { color: 'black' });
    gsap.to('.navBar', 1, { clipPath: 'circle(2500px at 100% -10%' })
    document.body.classList.add('hide');
  } else {
    event.target.classList.remove('active');
    gsap.to('.line1', .5, { rotate: '0',y:0, background:'white'});
    gsap.to('.line2', .5, { rotate: '0', y:0, background:'white' });
    gsap.to('#logo', 1, { color: 'white' });
    gsap.to('.navBar',1, {clipPath:'circle(50px at 100% -10%'})
    document.body.classList.remove('hide');
  }
}
//Event Listeners
burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);
animateSlides();