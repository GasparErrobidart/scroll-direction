class ScrollDirection{

  constructor(options){
    const { target = window , addClassesTo = 'body', minInterval = 25 } = options
    this.minInterval      = minInterval // Interval between checks
    this.target           = target
    this.addClassesTo     = addClassesTo ? document.querySelector(addClassesTo) : addClassesTo;
    this.last             = 0
    this.ready            = true
    this.lastHeight       = null
    this.direction        = ''
    this.detectDirection  = this.detectDirection.bind(this)
    this.enable           = this.enable.bind(this)
    this.watch()
  }

  scrollHandler(ev){
    if(this.ready){
      ready = false
      this.detectDirection(ev)
      setTimeout(restore,this.minInterval)
    }
  }

  enable(){
    this.ready = true
  }

  watch(){
    let ready = true
    let restore = ()=> ready = true
    this.listener = this.detectDirection.bind(this)
    this.target.addEventListener('touchstart',this.enable)
    this.target.addEventListener('touchend',this.enable)
    this.target.addEventListener('touchmove',this.enable)
    this.target.addEventListener('scroll',this.scrollHandler)
  }

  stop(){
    this.target.removeEventListener('scroll',this.listener)
    this.target.removeEventListener('touchstart',this.enable)
    this.target.removeEventListener('touchend',this.enable)
    this.target.removeEventListener('touchmove',this.enable)
  }

  addClasses(){
    if(this.addClassesTo && this.direction){
      const el = this.addClassesTo
      const right = this.direction
      const wrong = right == 'down' ? 'up' : 'down'
      el.className = el.className.replace('scroll-direction-'+wrong, '').replace(/\s\s/gi,' ') + ' scroll-direction-'+right
    }
  }

  onDirectionChange(){
    this.addClasses()
    this.target.dispatchEvent(new CustomEvent('scrollDirectionChange',{ detail : this }))
  }

  detectDirection(ev){
    let scrolled      = this.target.scrollY || this.target.scrollTop || 0
    let height        = ( this.target  == window ) ? document.body.clientHeight : this.target.clientHeight
    let heightDiff    = 0

    // If document height changed, adjust scroll value
    if(typeof this.lastHeight != "number") this.lastHeight = height
    if(this.lastHeight != height){
      heightDiff = height - this.lastHeight
    }

    let newDirection = this.direction

    if( scrolled > this.last + heightDiff ){
      newDirection = "down"
    }else if(scrolled < this.last + heightDiff){
      newDirection = "up"
    }


    this.last           = scrolled
    this.lastHeight     = height
    if(this.direction   != newDirection){
      this.direction    = newDirection
      this.onDirectionChange()
    }

  }

}
