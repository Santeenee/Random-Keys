/* constants */
const KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const
const FIXED_DO_KEYS = ['LA', 'SI', 'DO', 'RE', 'MI', 'FA', 'SOL'] as const

const SHARP = '#' as const
const FLAT = '♭' as const

const MAJ = 'M' as const
const min = 'm' as const

/* DOM */
const shuffleBtn = document.querySelector<HTMLButtonElement>('#shuffle')
const keyDiv = document.querySelector<HTMLDivElement>('#key')

/* DOM - SELECTs elements */
const langSelect = document.querySelector<HTMLSelectElement>('#select-lang')
const filtersSelect = document.querySelector<HTMLSelectElement>('#select-filters')

// 'fixed-do' | 'eng-system'
let lang = 'fixed-do'
// 'easy' | 'medium' | 'hard'
let mode = 'easy'

/* lang change */
langSelect?.addEventListener('change', function () {
  lang = this.value
  console.log(this.value)
})

/* mode change */
filtersSelect?.addEventListener('change', function () {
  mode = this.value
  console.log(this.value)
})

/* '🔀 SHUFFLE' clicked */
shuffleBtn?.addEventListener('click', () => {

  document.body?.style.setProperty('--hue', getRandomInt(360).toString())

  const randKey = lang === 'fixed-do' ? FIXED_DO_KEYS[getRandomInt(7)] : KEYS[getRandomInt(7)]

  const randAlteration = getRandAlteration()

  //min or Maj
  const keyType = getKeyType()

  //between 0 and 6 included
  changeKey(randKey, randAlteration, keyType)
})


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
} //thank you, MDN


function getRandAlteration() {
  const randAlterationNum = getRandomInt(3)

  //skips rand = 0
  if (randAlterationNum === 1) return FLAT
  else if (randAlterationNum === 2) return SHARP
}

function getKeyType() {
  const randKeyType = getRandomInt(2)

  return randKeyType === 0 ? MAJ : min
}

function changeKey(key: string, alt = '', keyType: string) {
  if (!keyDiv) return

  keyDiv.classList.add('animate')
  keyDiv.addEventListener('animationend', () => {
    keyDiv.classList.remove('animate')
  })
  keyDiv.addEventListener('animationcancel', () => {
    keyDiv.classList.remove('animate')
  })

  if (mode === 'easy') keyDiv.innerText = `${key} M`
  else if (mode === 'medium') keyDiv.innerText = `${key}${alt} M`
  else if (mode === 'hard') keyDiv.innerText = `${key}${alt} ${keyType}`
  else keyDiv.innerText = 'what??'
}
