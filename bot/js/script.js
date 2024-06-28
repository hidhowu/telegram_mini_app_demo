const overflow = 100
document.body.style.overflowY = 'hidden'
document.body.style.marginTop = `${overflow}px`
document.body.style.height = window.innerHeight + overflow + "px"
document.body.style.paddingBottom = `${overflow}px`
window.scrollTo(0, overflow)

let ts
const onTouchStart = (e) => {
    ts = e.touches[0].clientY
}
const onTouchMove = (e) => {
    if (scrollableEl) {
        const scroll = scrollableEl.scrollTop
        const te = e.changedTouches[0].clientY
        if (scroll <= 0 && ts < te) {
            e.preventDefault()
        }
    } else {
        e.preventDefault()
    }
}
