const slider = document.querySelector('[data-js-slider]')
const slide = document.querySelectorAll('[data-js-slide]')
const buttonPrev = document.querySelector('[ data-js-button-prev]')
const buttonNext = document.querySelector('[ data-js-button-next]')

let slideIndex = 0
let scrollTimeout 

const scrolling = () => {
    slide[slideIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
    })
}

const levelingCard = () => {
    const vieportCenter = slider.getBoundingClientRect().width / 2
    let targetCard = null
    let minDistance = Infinity

    slide.forEach((slide, index) => {
        slidePosition = slide.getBoundingClientRect().left
        slideCenter = slidePosition + slide.getBoundingClientRect().width / 2
        distance = Math.abs(vieportCenter - slideCenter)
        if(distance < minDistance) {
            minDistance = distance
            targetCard = slide
            slideIndex = index
        }
    })

    targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
    })
}

const scrollGrap = () => {
    let isDraging = false
    let startX
    let startScrollLeft

    slider.addEventListener('mousedown', (event) => {
        isDraging = true
        startX = event.pageX
        startScrollLeft = slider.scrollLeft
        event.preventDefault()
    })

    slider.addEventListener('mouseup', () => {
        if(!isDraging) return
        isDraging = false
    })

    slider.addEventListener('mousemove', (event) => {
        if(!isDraging) return
        const dx = event.pageX - startX
        slider.scrollLeft = startScrollLeft - dx
    })
}

slider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
        levelingCard()
    },200)
})

buttonNext.addEventListener('click', () => {
    if(slideIndex === slide.length - 1) return
    slideIndex++
    scrolling()
})

buttonPrev.addEventListener('click', () => {
    if(slideIndex === 0) return
    slideIndex--
    scrolling()
})

scrollGrap()

scrolling()