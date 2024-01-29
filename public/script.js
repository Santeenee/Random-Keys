/* constants */
var KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var FIXED_DO_KEYS = ['LA', 'SI', 'DO', 'RE', 'MI', 'FA', 'SOL'];
var SHARP = '#';
var FLAT = '♭';
var MAJ = 'M';
var min = 'm';
/* DOM */
var shuffleBtn = document.querySelector('#shuffle');
var keyDiv = document.querySelector('#key');
/* DOM - SELECTs elements */
var langSelect = document.querySelector('#select-lang');
var filtersSelect = document.querySelector('#select-filters');
// 'fixed-do' | 'eng-system'
var lang = 'fixed-do';
// 'easy' | 'medium' | 'hard'
var mode = 'easy';
/* lang change */
langSelect === null || langSelect === void 0 ? void 0 : langSelect.addEventListener('change', function () {
    lang = this.value;
    console.log(this.value);
});
/* mode change */
filtersSelect === null || filtersSelect === void 0 ? void 0 : filtersSelect.addEventListener('change', function () {
    mode = this.value;
    console.log(this.value);
});
/* '🔀 SHUFFLE' clicked */
shuffleBtn === null || shuffleBtn === void 0 ? void 0 : shuffleBtn.addEventListener('click', function () {
    var _a;
    shuffleBtn.classList.add('clicked');
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.style.setProperty('--hue', getRandomInt(360).toString());
    var randKey = lang === 'fixed-do' ? FIXED_DO_KEYS[getRandomInt(7)] : KEYS[getRandomInt(7)];
    var randAlteration = getRandAlteration();
    //min or Maj
    var keyType = getKeyType();
    //between 0 and 6 included
    changeKey(randKey, randAlteration, keyType);
});
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
} //thank you, MDN
function getRandAlteration() {
    var randAlterationNum = getRandomInt(3);
    //skips rand = 0
    if (randAlterationNum === 1)
        return FLAT;
    else if (randAlterationNum === 2)
        return SHARP;
}
function getKeyType() {
    var randKeyType = getRandomInt(2);
    return randKeyType === 0 ? MAJ : min;
}
function changeKey(key, alt, keyType) {
    if (alt === void 0) { alt = ''; }
    if (!keyDiv)
        return;
    keyDiv.classList.add('animate');
    keyDiv.addEventListener('animationend', function () {
        keyDiv.classList.remove('animate');
    });
    keyDiv.addEventListener('animationcancel', function () {
        keyDiv.classList.remove('animate');
    });
    if (mode === 'easy')
        keyDiv.innerText = "".concat(key, " M");
    else if (mode === 'medium')
        keyDiv.innerText = "".concat(key).concat(alt, " M");
    else if (mode === 'hard')
        keyDiv.innerText = "".concat(key).concat(alt, " ").concat(keyType);
    else
        keyDiv.innerText = 'what??';
}
setTimeout(function () {
    if (!(shuffleBtn === null || shuffleBtn === void 0 ? void 0 : shuffleBtn.classList.contains('clicked'))) {
        shuffleBtn === null || shuffleBtn === void 0 ? void 0 : shuffleBtn.classList.add('hint');
    }
}, 5000);
