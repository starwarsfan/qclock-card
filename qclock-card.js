/**
 * QClock Card – Wort-Uhr für Home Assistant Lovelace
 *
 * Portiert aus der Edomi-Implementation (PHP) von Yves.
 * Unterstützte Sprachen: de, en, fr, it, es
 * Erweiterbar: neuen Sprachblock in CLOCK_LANGUAGES ergänzen → PR stellen.
 *
 * HACS:  content_in_root: true  (hacs.json)
 *
 * Lovelace-Konfiguration:
 *   type: custom:qclock-card
 *   language: de              # de | en | fr | it | es  (default: de)
 *   color_active: "#e8d5b0"
 *   color_inactive: "#252018"
 *   color_background: "#0d0d0d"
 *   color_highlight: "#c8a050"
 *   font_size: 1.6             # rem
 */

// ─────────────────────────────────────────────────────────────────────────────
// SPRACH-DEFINITIONEN
//
// Jede Sprache definiert:
//   matrixRows    – 10×11 Zeichen (string[][] oder char[][])
//   startWords    – Einleitungsworte  [[row, colStart, colEnd], …]  (inkl.)
//   endWords      – "UHR" / "O'CLOCK" / "HEURES" bei vollen Stunden
//   hourWords     – { hour: [[row, start, end], …] }   (0–12, 100=Sonderfall)
//   minuteWords   – { minute: [[row, start, end], …] } (5,10,…,55)
//   hourIncrement – Ab welcher Minute wird die nächste Stunde gezeigt
//
// Koordinaten [row, start, end] sind beidseitig INKLUSIVE (1:1 aus PHP).
// ─────────────────────────────────────────────────────────────────────────────

const CLOCK_LANGUAGES = {

  // ── Deutsch ──────────────────────────────────────────────────────────────
  // Raster aus: LB_LBSID_getClockMatrix('de')
  // E S M I S T E F Ü N F
  // Z E H N Z W A N Z I G
  // N A C H V I E R T E L
  // V O R N A C H H A L B
  // E I N S I N K Z W E I
  // D R E I E A N V I E R
  // F Ü N F N I S E C H S
  // S I E B E N I A C H T
  // N E U N Z E H N E L F
  // Z W Ö L F K A B U H R
  de: {
    label: "Deutsch",
    matrixRows: [
      ["E","S","M","I","S","T","E","F","Ü","N","F"],  // 0
      ["Z","E","H","N","Z","W","A","N","Z","I","G"],  // 1
      ["N","A","C","H","V","I","E","R","T","E","L"],  // 2
      ["V","O","R","N","A","C","H","H","A","L","B"],  // 3
      ["E","I","N","S","I","N","K","Z","W","E","I"],  // 4
      ["D","R","E","I","E","A","N","V","I","E","R"],  // 5
      ["F","Ü","N","F","N","I","S","E","C","H","S"],  // 6
      ["S","I","E","B","E","N","I","A","C","H","T"],  // 7
      ["N","E","U","N","Z","E","H","N","E","L","F"],  // 8
      ["Z","W","Ö","L","F","K","A","B","U","H","R"],  // 9
    ],
    startWords: [[0,0,1],[0,3,5]],   // ES  IST
    endWords:   [[9,8,10]],          // UHR
    hourWords: {
      0: [[9,0,4]],    // ZWÖLF
      1: [[4,0,3]],    // EINS
      2: [[4,7,10]],   // ZWEI
      3: [[5,0,3]],    // DREI
      4: [[5,7,10]],   // VIER
      5: [[6,0,3]],    // FÜNF
      6: [[6,6,10]],   // SECHS
      7: [[7,0,5]],    // SIEBEN
      8: [[7,7,10]],   // ACHT
      9: [[8,0,3]],    // NEUN
      10: [[8,4,7]],    // ZEHN
      11: [[8,8,10]],   // ELF
      12: [[9,0,4]],    // ZWÖLF
      100: [[4,0,2]],   // EIN (singular: "EIN UHR")
    },
    minuteWords: {
      5: [[0,7,10],[2,0,3]],           // FÜNF NACH
      10: [[1,0,3],[2,0,3]],            // ZEHN NACH
      15: [[2,4,10],[3,3,6]],           // VIERTEL NACH
      20: [[1,4,10],[3,3,6]],           // ZWANZIG NACH
      25: [[0,7,10],[3,0,2],[3,7,10]],  // FÜNF VOR HALB
      30: [[3,7,10]],                    // HALB
      35: [[0,7,10],[2,0,3],[3,7,10]],  // FÜNF NACH HALB
      40: [[1,4,10],[3,0,2]],           // ZWANZIG VOR
      45: [[2,4,10],[3,0,2]],           // VIERTEL VOR
      50: [[1,0,3],[3,0,2]],            // ZEHN VOR
      55: [[0,7,10],[3,0,2]],           // FÜNF VOR
    },
    hourIncrement: 24,
  },

  // ── English ───────────────────────────────────────────────────────────────
  // I T L I S B F A M P M
  // A C Q U A R T E R D C
  // T W E N T Y F I V E X
  // H A L F B T E N F T O
  // P A S T E R U N I N E
  // O N E S I X T H R E E
  // F O U R F I V E T W O
  // E I G H T E L E V E N
  // S E V E N T W E L V E
  // T E N S E O ' C L O C
  en: {
    label: "English",
    matrixRows: [
      ["I","T","L","I","S","B","F","A","M","P","M"],  // 0
      ["A","C","Q","U","A","R","T","E","R","D","C"],  // 1
      ["T","W","E","N","T","Y","F","I","V","E","X"],  // 2
      ["H","A","L","F","B","T","E","N","F","T","O"],  // 3
      ["P","A","S","T","E","R","U","N","I","N","E"],  // 4
      ["O","N","E","S","I","X","T","H","R","E","E"],  // 5
      ["F","O","U","R","F","I","V","E","T","W","O"],  // 6
      ["E","I","G","H","T","E","L","E","V","E","N"],  // 7
      ["S","E","V","E","N","T","W","E","L","V","E"],  // 8
      ["T","E","N","S","E","O","'","C","L","O","C"],  // 9
    ],
    startWords: [[0,0,1],[0,3,4]],   // IT  IS
    endWords:   [[9,5,10]],          // O'CLOCK
    hourWords: {
      0: [[8,5,10]],   // TWELVE
      1: [[5,0,2]],    // ONE
      2: [[6,8,10]],   // TWO
      3: [[5,6,10]],   // THREE
      4: [[6,0,3]],    // FOUR
      5: [[6,4,7]],    // FIVE
      6: [[5,3,5]],    // SIX
      7: [[8,0,4]],    // SEVEN
      8: [[7,0,4]],    // EIGHT
      9: [[4,7,10]],   // NINE
      10: [[9,0,2]],    // TEN
      11: [[7,5,10]],   // ELEVEN
      12: [[8,5,10]],   // TWELVE
      100: [],
    },
    minuteWords: {
      5: [[2,6,9],[4,0,3]],     // FIVE PAST
      10: [[3,5,7],[4,0,3]],     // TEN PAST
      15: [[1,2,8],[4,0,3]],     // QUARTER PAST
      20: [[2,0,5],[4,0,3]],     // TWENTY PAST
      25: [[2,0,9],[4,0,3]],     // TWENTY FIVE PAST
      30: [[3,0,3],[4,0,3]],     // HALF PAST
      35: [[2,0,9],[3,9,10]],    // TWENTY FIVE TO
      40: [[2,0,5],[3,9,10]],    // TWENTY TO
      45: [[1,2,8],[3,9,10]],    // QUARTER TO
      50: [[3,5,7],[3,9,10]],    // TEN TO
      55: [[2,6,9],[3,9,10]],    // FIVE TO
    },
    hourIncrement: 29,
  },

  // ── Français ──────────────────────────────────────────────────────────────
  // I I C E S T G H U N E
  // D E U X P Q T R O I S
  // Q U A T R E C D S I X
  // S E P T D I X C I N Q
  // N E U F W H U I T B C
  // O N Z E H D O U Z E O
  // P Q R S T H E U R E S
  // M O I N S F E T D I X
  // Q U A R T D E M I U V
  // W V I N G T - C I N Q
  fr: {
    label: "Français",
    matrixRows: [
      ["I","I","C","E","S","T","G","H","U","N","E"],  // 0
      ["D","E","U","X","P","Q","T","R","O","I","S"],  // 1
      ["Q","U","A","T","R","E","C","D","S","I","X"],  // 2
      ["S","E","P","T","D","I","X","C","I","N","Q"],  // 3
      ["N","E","U","F","W","H","U","I","T","B","C"],  // 4
      ["O","N","Z","E","H","D","O","U","Z","E","O"],  // 5
      ["P","Q","R","S","T","H","E","U","R","E","S"],  // 6
      ["M","O","I","N","S","F","E","T","D","I","X"],  // 7
      ["Q","U","A","R","T","D","E","M","I","U","V"],  // 8
      ["W","V","I","N","G","T","-","C","I","N","Q"],  // 9
    ],
    startWords: [[0,0,1],[0,3,5]],   // IL  EST
    endWords:   [[6,5,9]],           // HEURE(S)
    hourWords: {
      0: [[5,5,9]],    // DOUZE
      1: [[0,8,10]],   // UNE
      2: [[1,0,3]],    // DEUX
      3: [[1,6,10]],   // TROIS
      4: [[2,0,5]],    // QUATRE
      5: [[3,7,10]],   // CINQ
      6: [[2,8,10]],   // SIX
      7: [[3,0,3]],    // SEPT
      8: [[4,0,3]],    // NEUF
      9: [[4,5,8]],    // HUIT
      10: [[3,4,6]],    // DIX
      11: [[5,0,3]],    // ONZE
      12: [[5,5,9]],    // DOUZE
      100: [],
    },
    minuteWords: {
      5: [[6,5,10],[9,7,10]],               // HEURES CINQ
      10: [[6,5,10],[7,8,10]],               // HEURES DIX
      15: [[6,5,10],[8,0,4]],                // HEURES ET QUART
      20: [[6,5,10],[9,1,5]],                // HEURES VINGT
      25: [[6,5,10],[9,1,10]],               // HEURES VINGT-CINQ
      30: [[6,5,10],[7,6,7],[8,5,8]],        // HEURES ET DEMIE
      35: [[6,5,10],[7,0,4],[9,1,10]],       // HEURES MOINS VINGT-CINQ
      40: [[6,5,10],[7,0,4],[9,1,5]],        // HEURES MOINS VINGT
      45: [[6,5,10],[7,0,4],[8,0,4]],        // HEURES MOINS LE QUART
      50: [[6,5,10],[7,0,4],[7,8,10]],       // HEURES MOINS DIX
      55: [[6,5,10],[7,0,4],[9,7,10]],       // HEURES MOINS CINQ
    },
    hourIncrement: 30,
  },

  // ── Italiano ──────────────────────────────────────────────────────────────
  // S O N O E L E H I J K
  // È M L ' U N A S D U E
  // T R E N O V E O T T O
  // S E T T E C I N Q U E
  // D O D I C B D I E C I
  // Q U A T T R O F S E I
  // U N D I C I F M E N O
  // E K U N L Q U A R T O
  // V E N T I C I N Q U E
  // D I E C I L M E Z Z O
  it: {
    label: "Italiano",
    matrixRows: [
      ["S","O","N","O","E","L","E","H","I","J","K"],  // 0
      ["È","M","L","'","U","N","A","S","D","U","E"],  // 1
      ["T","R","E","N","O","V","E","O","T","T","O"],  // 2
      ["S","E","T","T","E","C","I","N","Q","U","E"],  // 3
      ["D","O","D","I","C","B","D","I","E","C","I"],  // 4
      ["Q","U","A","T","T","R","O","F","S","E","I"],  // 5
      ["U","N","D","I","C","I","F","M","E","N","O"],  // 6
      ["E","K","U","N","L","Q","U","A","R","T","O"],  // 7
      ["V","E","N","T","I","C","I","N","Q","U","E"],  // 8
      ["D","I","E","C","I","L","M","E","Z","Z","O"],  // 9
    ],
    startWords: [[0,0,3],[0,5,6]],   // SONO  LE
    endWords:   [],
    hourWords: {
      0: [[4,0,4]],    // DODIC(I)
      1: [[1,2,5]],    // L'UNA
      2: [[1,7,9]],    // DUE
      3: [[2,0,2]],    // TRE
      4: [[5,0,5]],    // QUATTRO
      5: [[3,5,10]],   // CINQUE
      6: [[5,8,10]],   // SEI
      7: [[3,0,4]],    // SETTE
      8: [[2,7,10]],   // OTTO
      9: [[2,3,6]],    // NOVE
      10: [[4,6,10]],   // DIECI
      11: [[6,0,5]],    // UNDICI
      12: [[4,0,4]],    // DODICI
      100: [],
    },
    minuteWords: {
      5: [[7,0,0],[7,2,3],[8,5,10]],   // E UN QUARTO... CINQUE
      10: [[7,0,0],[7,2,3],[9,0,5]],    // E DIECI
      15: [[7,0,0],[7,2,3],[7,5,10]],   // E UN QUARTO
      20: [[7,0,0],[7,2,3],[8,0,4]],    // E VENTI
      25: [[7,0,0],[7,2,3],[8,0,10]],   // E VENTICINQUE
      30: [[7,0,0],[9,6,10]],           // E MEZZO
      35: [[6,7,10],[7,2,3],[8,0,10]],  // MENO VENTICINQUE
      40: [[6,7,10],[7,2,3],[8,0,4]],   // MENO VENTI
      45: [[6,7,10],[7,2,3],[7,5,10]],  // MENO UN QUARTO
      50: [[6,7,10],[7,2,3],[9,0,5]],   // MENO DIECI
      55: [[6,7,10],[7,2,3],[8,5,10]],  // MENO CINQUE
    },
    hourIncrement: 30,
  },

  // ── Español ───────────────────────────────────────────────────────────────
  // E S O N F L A S U N A
  // D O S T R E S O C H O
  // C U A T R O C I N C O
  // S I E T E R N U E V E
  // O N C E V D I E Z F G
  // S E I S D O C E Y E N
  // P U N T O G M E N O S
  // M E D I A C U A R T O
  // D I E Z L V E I N T E
  // V E I N T I C I N C O
  es: {
    label: "Español",
    matrixRows: [
      ["E","S","O","N","F","L","A","S","U","N","A"],  // 0
      ["D","O","S","T","R","E","S","O","C","H","O"],  // 1
      ["C","U","A","T","R","O","C","I","N","C","O"],  // 2
      ["S","I","E","T","E","R","N","U","E","V","E"],  // 3
      ["O","N","C","E","V","D","I","E","Z","F","G"],  // 4
      ["S","E","I","S","D","O","C","E","Y","E","N"],  // 5
      ["P","U","N","T","O","G","M","E","N","O","S"],  // 6
      ["M","E","D","I","A","C","U","A","R","T","O"],  // 7
      ["D","I","E","Z","L","V","E","I","N","T","E"],  // 8
      ["V","E","I","N","T","I","C","I","N","C","O"],  // 9
    ],
    startWords: [[0,1,3],[0,5,7]],   // SON  LAS
    endWords:   [[5,9,10],[6,0,4]],  // EN PUNTO
    hourWords: {
      0: [[5,4,7]],    // DOCE
      1: [[0,8,10]],   // UNA
      2: [[1,0,2]],    // DOS
      3: [[1,3,6]],    // TRES
      4: [[2,0,5]],    // CUATRO
      5: [[2,6,10]],   // CINCO
      6: [[5,0,3]],    // SEIS
      7: [[3,0,4]],    // SIETE
      8: [[1,7,10]],   // OCHO
      9: [[3,6,10]],   // NUEVE
      10: [[4,5,8]],    // DIEZ
      11: [[4,0,3]],    // ONCE
      12: [[5,4,7]],    // DOCE
      100: [],
    },
    minuteWords: {
      5: [[5,8,8],[9,6,10]],    // Y CINCO
      10: [[5,8,8],[8,0,3]],     // Y DIEZ
      15: [[5,8,8],[7,5,10]],    // Y CUARTO
      20: [[5,8,8],[8,5,10]],    // Y VEINTE
      25: [[5,8,8],[9,0,10]],    // Y VEINTICINCO
      30: [[5,8,8],[7,0,4]],     // Y MEDIA
      35: [[6,6,10],[9,0,10]],   // MENOS VEINTICINCO
      40: [[6,6,10],[8,5,10]],   // MENOS VEINTE
      45: [[6,6,10],[7,5,10]],   // MENOS CUARTO
      50: [[6,6,10],[8,0,3]],    // MENOS DIEZ
      55: [[6,6,10],[9,6,10]],   // MENOS CINCO
    },
    hourIncrement: 30,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGIK
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Berechnet alle aktiven [row, start, end]-Koordinaten für eine gegebene Zeit.
 * @param {string} lang  - Sprachkürzel
 * @param {number} hours - Stunden (0–23)
 * @param {number} minutes - Minuten (0–59)
 * @returns {Array}  Array von [row, start, end]
 */
function getActiveCoords(lang, hours, minutes) {
  const def    = CLOCK_LANGUAGES[lang] || CLOCK_LANGUAGES["de"];
  const coords = [];

  // Einleitungsworte immer aktiv
  def.startWords.forEach(c => coords.push(c));

  // Minuten auf 5er-Raster runden
  const m5 = Math.floor(minutes / 5) * 5;

  // Stunden-Berechnung: Ab hourIncrement wird zur nächsten Stunde gewechselt
  let h = hours % 12;
  if (m5 >= 5 && m5 > def.hourIncrement) {
    h = (h + 1) % 12;
  }

  // Sonderfall Deutsch: "EIN UHR" (singular) statt "EINS UHR"
  let hourKey = h;
  if (lang === "de" && h === 1 && m5 === 0) {
    hourKey = 100;
  }

  const hourCoords = def.hourWords[hourKey] || def.hourWords[h] || [];
  hourCoords.forEach(c => coords.push(c));

  // Minuten-Wörter oder Endwort (UHR/O'CLOCK)
  if (m5 >= 5) {
    (def.minuteWords[m5] || []).forEach(c => coords.push(c));
  } else {
    def.endWords.forEach(c => coords.push(c));
  }

  return coords;
}

/**
 * Gibt ein Boolean-Array [dot1, dot2, dot3, dot4] zurück,
 * das die Einzelminuten 1–4 anzeigt (wie im PHP-Fallthrough-Switch).
 */
function getMinuteDots(minutes) {
  const mod = minutes % 5;
  return [mod >= 1, mod >= 2, mod >= 3, mod >= 4];
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────

const QCLOCK_STYLES = `
  :host {
    display: block;
    aspect-ratio: 1 / 1;        /* Card im Dashboard quadratisch halten */
    --qc-bg:       var(--qclock-bg,       #0d0d0d);
    --qc-active:   var(--qclock-active,   #e8d5b0);
    --qc-inactive: var(--qclock-inactive, #252018);
    --qc-hi:       var(--qclock-highlight,#c8a050);
    --qc-glow:     var(--qclock-glow,     rgba(200,160,80,0.4));
    --qc-radius:   var(--qclock-radius,   14px);
    --qc-fs:       var(--qclock-fs,       1.55rem);
    font-family: 'Courier New', 'Lucida Console', 'DejaVu Sans Mono', monospace;
  }

  .wrapper {
    background: var(--qc-bg);
    border-radius: var(--qc-radius);
    padding: 1.4em 1.1em 1.1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3em;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow:
      inset 0 0 60px rgba(0,0,0,0.65),
      0 6px 30px rgba(0,0,0,0.55),
      0 0 0 1px rgba(255,255,255,0.035);
  }

  .wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 65% 55% at 50% 46%,
      rgba(200,160,80,0.045) 0%,
      transparent 68%
    );
    pointer-events: none;
  }

  .row {
    display: flex;
    gap: 0.25em;
    letter-spacing: 0.12em;
  }

  .letter {
    display: inline-block;
    min-width: 1em;
    text-align: center;
    font-size: var(--qc-fs);
    font-weight: 700;
    line-height: 1.1;
    color: var(--qc-inactive);
    transition: color 0.55s ease, text-shadow 0.55s ease;
    user-select: none;
  }

  .letter.on {
    color: var(--qc-active);
    text-shadow:
      0 0 7px  var(--qc-glow),
      0 0 18px var(--qc-glow);
  }

  .letter.hi {
    color: var(--qc-hi);
    text-shadow:
      0 0 9px  rgba(200,160,80,0.7),
      0 0 24px rgba(200,160,80,0.3);
  }

  .dots {
    display: flex;
    gap: 0.6em;
    margin-top: 0.65em;
  }

  .dot {
    width:  0.4em;
    height: 0.4em;
    border-radius: 50%;
    background: var(--qc-inactive);
    transition: background 0.35s ease, box-shadow 0.35s ease;
  }

  .dot.on {
    background: var(--qc-hi);
    box-shadow:
      0 0 6px  rgba(200,160,80,0.7),
      0 0 14px rgba(200,160,80,0.35);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM ELEMENT
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// VISUAL EDITOR
// ─────────────────────────────────────────────────────────────────────────────

const EDITOR_STYLES = `
  :host {
    display: block;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
  }

  .editor {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 4px 0;
  }

  .row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  /* Zwei Felder nebeneinander */
  .row-inline {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: flex-start;
  }

  .row-inline .row-lang {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .row-inline .row-size {
    width: 110px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-size: 0.85rem;
    color: var(--secondary-text-color, #888);
    font-weight: 500;
  }

  select {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    font-size: 1rem;
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border-color: var(--primary-color, #03a9f4);
  }

  /* Farbfelder: 2 Spalten nebeneinander */
  .color-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
  }

  .color-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .color-field label {
    font-size: 0.85rem;
    color: var(--secondary-text-color, #888);
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .color-inputs {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  input[type="color"] {
    width: 36px;
    height: 32px;
    padding: 2px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    cursor: pointer;
    background: none;
    flex-shrink: 0;
  }

  input[type="text"] {
    flex: 1;
    min-width: 0;
    padding: 6px 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    font-size: 0.85rem;
    font-family: monospace;
  }

  input[type="text"]:focus,
  input[type="number"]:focus {
    outline: none;
    border-color: var(--primary-color, #03a9f4);
  }

  input[type="number"] {
    width: 100px;
    padding: 8px 6px 8px 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    font-size: 1rem;
  }

  .hint {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #888);
    margin-top: 2px;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--secondary-text-color, #888);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    padding-bottom: 4px;
    margin-bottom: 4px;
  }
`;

class QClockCardEditor extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  // Wird von HA aufgerufen wenn sich externe States ändern – hier nicht nötig
  set hass(hass) {}

  _render() {
    const s = this.shadowRoot;
    s.innerHTML = "";

    const style = document.createElement("style");
    style.textContent = EDITOR_STYLES;
    s.appendChild(style);

    const editor = document.createElement("div");
    editor.className = "editor";

    // ── Sprache + Schriftgrösse nebeneinander ────────────────────────────────
    editor.appendChild(this._sectionTitle("Allgemein"));
    const inlineRow = document.createElement("div");
    inlineRow.className = "row-inline";
    const langField = this._buildSelect(
        "language", "Sprache",
        Object.entries(CLOCK_LANGUAGES).map(([k, v]) => ({ value: k, label: v.label })),
        this._config.language || "de"
    );
    langField.className = "row-lang";
    inlineRow.appendChild(langField);
    const sizeField = this._buildNumber(
        "font_size", "Grösse (rem)",
        this._config.font_size || 1.55,
        "0.5", "5", "0.05",
        "1.4–2.0"
    );
    sizeField.className = "row-size";
    inlineRow.appendChild(sizeField);
    editor.appendChild(inlineRow);

    // ── Farben ───────────────────────────────────────────────────────────────
    editor.appendChild(this._sectionTitle("Farben"));
    const colorGrid = document.createElement("div");
    colorGrid.className = "color-grid";
    colorGrid.appendChild(this._buildColor("color_background", "Hintergrund",        this._config.color_background || "#0d0d0d"));
    colorGrid.appendChild(this._buildColor("color_active",     "Aktive Buchstaben",  this._config.color_active     || "#e8d5b0"));
    colorGrid.appendChild(this._buildColor("color_highlight",  "Highlight (ES IST)", this._config.color_highlight  || "#c8a050"));
    colorGrid.appendChild(this._buildColor("color_inactive",   "Inaktive Buchst.",   this._config.color_inactive   || "#252018"));
    editor.appendChild(colorGrid);

    s.appendChild(editor);
  }

  // ── Hilfsmethoden ─────────────────────────────────────────────────────────

  _sectionTitle(text) {
    const el = document.createElement("div");
    el.className = "section-title";
    el.textContent = text;
    return el;
  }

  _buildSelect(key, labelText, options, currentValue) {
    const row = document.createElement("div");
    row.className = "row";

    const label = document.createElement("label");
    label.textContent = labelText;
    row.appendChild(label);

    const select = document.createElement("select");
    options.forEach(({ value, label }) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      if (value === currentValue) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => this._fire(key, select.value));
    row.appendChild(select);
    return row;
  }

  _buildColor(key, labelText, currentValue) {
    const row = document.createElement("div");
    row.className = "color-field";

    const label = document.createElement("label");
    label.textContent = labelText;
    row.appendChild(label);

    const inputs = document.createElement("div");
    inputs.className = "color-inputs";

    // Color Picker
    const picker = document.createElement("input");
    picker.type  = "color";
    picker.value = currentValue;

    // Hex-Textfeld
    const text = document.createElement("input");
    text.type  = "text";
    text.value = currentValue;
    text.maxLength = 7;
    text.placeholder = "#000000";

    // Picker → Text + Fire
    picker.addEventListener("input", () => {
      text.value = picker.value;
      this._fire(key, picker.value);
    });

    // Text → Picker + Fire (nur bei gültigem Hex)
    text.addEventListener("change", () => {
      const val = text.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        picker.value = val;
        this._fire(key, val);
      }
    });

    inputs.appendChild(picker);
    inputs.appendChild(text);
    row.appendChild(inputs);
    return row;
  }

  _buildNumber(key, labelText, currentValue, min, max, step, hint) {
    const row = document.createElement("div");
    row.className = "row";

    const label = document.createElement("label");
    label.textContent = labelText;
    row.appendChild(label);

    const input = document.createElement("input");
    input.type  = "number";
    input.min   = parseFloat(min);
    input.max   = parseFloat(max);
    input.step  = parseFloat(step);
    input.value = parseFloat(currentValue);  // value NACH min/max setzen
    input.addEventListener("change", () => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) this._fire(key, val);
    });
    row.appendChild(input);

    if (hint) {
      const hintEl = document.createElement("div");
      hintEl.className = "hint";
      hintEl.textContent = hint;
      row.appendChild(hintEl);
    }

    return row;
  }

  // Config-Changed Event an HA schicken
  _fire(key, value) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail:  { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }
}

class QClockCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._cfg      = { language: "de" };
    this._timeout  = null;
    this._interval = null;
    this._builtLang = null;
    this._testTime  = null;
  }

  setConfig(config) {
    this._cfg = { language: "de", ...config };
    if (this._cfg.language !== this._builtLang) {
      this._build();
    } else {
      const wrapper = this.shadowRoot && this.shadowRoot.querySelector(".wrapper");
      this._applyCSSVars();
    }
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
  }

  // ── Öffentliche Test-API (für Preview / Entwicklung) ──────────────────────
  setTestTime(h, m) {
    this._testTime = { h, m };
    clearTimeout(this._timeout);
    clearInterval(this._interval);
    this._update();
  }

  clearTestTime() {
    this._testTime = null;
    this._update();
    this._schedule();
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector(".wrapper")) {
      this._build();
    }
    this._update();
    this._schedule();
  }

  disconnectedCallback() {
    clearTimeout(this._timeout);
    clearInterval(this._interval);
  }

  // ── DOM aufbauen ───────────────────────────────────────────────────────────
  _build() {
    const lang  = this._cfg.language || "de";
    const def   = CLOCK_LANGUAGES[lang] || CLOCK_LANGUAGES["de"];
    const s     = this.shadowRoot;
    s.innerHTML = "";
    this._builtLang = lang;

    const style = document.createElement("style");
    style.textContent = QCLOCK_STYLES;
    s.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    this._applyCSSVars();

    // Buchstaben-Raster
    def.matrixRows.forEach((row, ri) => {
      const rowEl = document.createElement("div");
      rowEl.className = "row";
      row.forEach((char, ci) => {
        const span = document.createElement("span");
        span.className = "letter";
        span.dataset.r = ri;
        span.dataset.c = ci;
        span.textContent = char;
        rowEl.appendChild(span);
      });
      wrapper.appendChild(rowEl);
    });

    // Minuten-Punkte
    const dots = document.createElement("div");
    dots.className = "dots";
    for (let i = 0; i < 4; i++) {
      const d = document.createElement("span");
      d.className = "dot";
      d.dataset.i = i;
      dots.appendChild(d);
    }
    wrapper.appendChild(dots);
    s.appendChild(wrapper);
  }

  // ── Anzeige aktualisieren ─────────────────────────────────────────────────
  _update() {
    const now  = new Date();
    const h    = this._testTime ? this._testTime.h : now.getHours();
    const m    = this._testTime ? this._testTime.m : now.getMinutes();
    const lang = this._cfg.language || "de";
    const def  = CLOCK_LANGUAGES[lang] || CLOCK_LANGUAGES["de"];

    const activeCoords = getActiveCoords(lang, h, m);

    // Aktive Felder als Set für O(1)-Lookup
    const activeSet = new Set();
    activeCoords.forEach(([row, start, end]) => {
      for (let c = start; c <= end; c++) activeSet.add(`${row},${c}`);
    });

    // Highlight-Set: Einleitungsworte (ES IST / IT IS / …)
    const hiSet = new Set();
    def.startWords.forEach(([row, start, end]) => {
      for (let c = start; c <= end; c++) hiSet.add(`${row},${c}`);
    });

    // Buchstaben
    this.shadowRoot.querySelectorAll(".letter").forEach(el => {
      const key = `${el.dataset.r},${el.dataset.c}`;
      el.classList.remove("on","hi");
      if      (hiSet.has(key))       el.classList.add("hi");
      else if (activeSet.has(key))   el.classList.add("on");
    });

    // Punkte
    const dots = getMinuteDots(m);
    this.shadowRoot.querySelectorAll(".dot").forEach(el => {
      el.classList.toggle("on", dots[parseInt(el.dataset.i)]);
    });
  }

  // ── Scheduler ─────────────────────────────────────────────────────────────
  _schedule() {
    clearTimeout(this._timeout);
    clearInterval(this._interval);
    const now      = new Date();
    const msToNext = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 250;
    this._timeout  = setTimeout(() => {
      this._update();
      this._interval = setInterval(() => this._update(), 60_000);
    }, msToNext);
  }

  // ── CSS-Variablen ─────────────────────────────────────────────────────────
  // Auf 'this' (dem Host-Element) setzen – greift via :host in allen Shadow-Root-Tiefen
  _applyCSSVars() {
    const c = this._cfg;
    if (c.color_background) this.style.setProperty("--qclock-bg",        c.color_background);
    if (c.color_active)     this.style.setProperty("--qclock-active",    c.color_active);
    if (c.color_inactive)   this.style.setProperty("--qclock-inactive",  c.color_inactive);
    if (c.color_highlight)  this.style.setProperty("--qclock-highlight", c.color_highlight);
    if (c.font_size)        this.style.setProperty("--qclock-fs",        `${c.font_size}rem`);
  }

  static getConfigElement() {
    // Sicherstellen dass der Editor registriert ist bevor HA ihn anfordert
    if (!customElements.get("qclock-card-editor")) {
      customElements.define("qclock-card-editor", QClockCardEditor);
    }
    return document.createElement("qclock-card-editor");
  }

  static getStubConfig() {
    return {
      language:         "de",
      color_active:     "#e8d5b0",
      color_inactive:   "#252018",
      color_background: "#0d0d0d",
      color_highlight:  "#c8a050",
    };
  }
}

customElements.define("qclock-card", QClockCard);



// HACS-Registrierung
window.customCards = window.customCards || [];
window.customCards.push({
  type:             "qclock-card",
  name:             "QClock – Wort-Uhr",
  description:      "Wort-Uhr (Word Clock) in Deutsch, Englisch, Französisch, Italienisch und Spanisch.",
  preview:          true,
  documentationURL: "https://github.com/YOUR_GITHUB/qclock-card",
});