/**
 * ГЕОКОНТ / GEOBOARD - Балаларға арналған интерактивті геоборд
 * Интерактивный геоконт Воскобовича для республиканского конкурса (РК)
 *
 * Архитектура:
 * 1. Аудио-синтезатор на Web Audio API (100% автономно, без внешних mp3)
 * 2. Синтез речи / Web Speech API (Казахский и Русский языки)
 * 3. Геометрия 8-лучевой розы ветров Воскобовича (33 штырька с подписями)
 * 4. Физика натяжения резинок (Touch + Mouse, Tap-Tap + Drag-and-Snap)
 * 5. Игровые режимы: Обучение с Барсенком Аланом, Шифр-задачи, Свободное творчество
 * 6. Этнопедагогический модуль: Казахские орнаменты (Қошқар мүйіз, Түйе табан, Бәйтерек, Киіз үй)
 * 7. Экспорт шедевра в PNG с казахским национальным обрамлением
 */

// ==========================================================================
// 1. ДВУЯЗЫЧНЫЙ СЛОВАРЬ (I18N: KAZ / RUS)
// ==========================================================================
const I18N = {
  kk: {
    appSubtitle: "Қазақстан балаларының цифрлық ойыны",
    modeLearn: "Оқыту мен ертек",
    modeTasks: "Шифр тапсырмалары",
    modeFree: "Еркін шығармашылық",
    contrastLabel: "Контраст",
    mascotName: "Алан Барсенок",
    mascotRole: "Сенің ақылшы досың",
    speakBtn: "Тыңдау",
    nextHint: "Келесі ➔",
    learnTitle: "Геоконт сырлары",
    btnShowRays: "Сәулелерді жағу",
    tasksCategoryTitle: "Тапсырмалар деңгейі",
    catSimple: "Жеңіл (Фигуралар)",
    catMedium: "Орташа (Әріп, сан)",
    catNational: "Ұлттық (Ою-өрнек)",
    targetCipherLabel: "Шифр:",
    hintBtn: "Көмек",
    checkBtn: "Тексеру",
    freeIdeasTitle: "Шабыт сызбалары",
    freeIdeasDesc: "Қалаған резеңкеңді таңдап, өз қиялыңдағы ғажайып суреттерді сал немесе мысалдарды пайдалан:",
    bandsCountLabel: "Тартылған резинкалар:",
    bandColorLabel: "Түсі:",
    btnUndo: "Болдырмау",
    btnFinishBand: "Бекіту",
    btnClear: "Тазалау",
    btnSaveImage: "Сақтау",
    raysTitle: "8 Сәуле (Радуга Воскобовича):",
    repeatBtn: "Қайталау",
    nextLevelBtn: "Келесі деңгей",
    ghostBtn: "Сұлба",
    exportTitle: "Өз туындыңды сақта!",
    exportPrompt: "Суретке есіміңді жаз және естелік ретінде жүктеп ал:",
    childNameLabel: "Жас шебердің есімі:",
    cancelBtn: "Жабу",
    downloadBtn: "📥 Жүктеп алу",
    ethnoTitle: "Білгенге маржан",
    ethnoText: "«Қошқар мүйіз» оюы — қазақ халқының ең қасиетті және көне оюларының бірі. Ол молшылық пен күш-қуатты бейнелейді.",
    // Mascot Greetings & Tips
    mascotWelcome: "Сәлем, жас өнертапқыш! Мен Аланмын. Сиқырлы Геоконт әлеміне қош келдің!",
    mascotLearnRays: "Қарашы! Ортада «О» штырькасы, ал одан 8 түрлі-түсті кемпірқосақ сәулесі тарайды: Қызылдан Аққа дейін!",
    mascotStretchHelp: "Резинканы бір штырькадан екіншісіне тарт! Содан соң фигураны жабу үшін бастапқы нүктеге орал.",
    mascotCorrect: "Керемет! Сен шифрді дәл таптың! Жарайсың!",
    mascotTryAgain: "Қайта байқап көрші! Шифрдегі барлық нүктелерді кезекпен жалға.",
    mascotFreeMode: "Бұл жерде өз қиялыңның шеберісің! Қалағаныңша түрлі-түсті фигуралар құрастыр!",
    statusSelecting: "Кез келген штырьканы бас",
    statusConnecting: "Келесі штырькаға резинканы тарт немесе «Бекіту» түймесін бас",
    targetGuide: "Нүктелерді кезекпен қос!"
  },
  ru: {
    appSubtitle: "Цифровая игра для детей Казахстана",
    modeLearn: "Обучение и сказка",
    modeTasks: "Задания по шифру",
    modeFree: "Свободное творчество",
    contrastLabel: "Контраст",
    mascotName: "Барсенок Алан",
    mascotRole: "Твой мудрый помощник",
    speakBtn: "Озвучить",
    nextHint: "Дальше ➔",
    learnTitle: "Секреты Геоконта",
    btnShowRays: "Зажечь лучи",
    tasksCategoryTitle: "Категории заданий",
    catSimple: "Простые (Фигуры)",
    catMedium: "Средние (Буквы, цифры)",
    catNational: "Национальные (Орнаменты)",
    targetCipherLabel: "Шифр:",
    hintBtn: "Подсказка",
    checkBtn: "Проверить",
    freeIdeasTitle: "Идеи для творчества",
    freeIdeasDesc: "Выбирай цветные резиночки, создавай любые узоры или выбери готовый пример:",
    bandsCountLabel: "Натянуто резинок:",
    bandColorLabel: "Цвет:",
    btnUndo: "Отменить",
    btnFinishBand: "Закрепить",
    btnClear: "Очистить",
    btnSaveImage: "Сохранить",
    raysTitle: "8 Лучей (Радуга Воскобовича):",
    repeatBtn: "Повторить",
    nextLevelBtn: "Следующий уровень",
    ghostBtn: "Контур",
    exportTitle: "Сохрани свой шедевр!",
    exportPrompt: "Напиши имя автора и скачай картинку на память:",
    childNameLabel: "Имя юного мастера:",
    cancelBtn: "Закрыть",
    downloadBtn: "📥 Скачать PNG",
    ethnoTitle: "Знаете ли вы?",
    ethnoText: "Орнамент «Қошқар мүйіз» (Бараний рог) — один из древнейших казахских узоров, символ изобилия, силы и благополучия.",
    // Mascot Greetings & Tips
    mascotWelcome: "Привет, юный исследователь! Я снежный барсенок Алан. Добро пожаловать в мир Геоконта!",
    mascotLearnRays: "В центре находится штырек «О», а вокруг — 8 цветных лучей радуги Воскобовича: от Красного до Белого!",
    mascotStretchHelp: "Натягивай резиночку от штырька к штырьку! Чтобы замкнуть фигуру, вернись в начальную точку.",
    mascotCorrect: "Блестяще! Ты в точности повторил шифр! Молодец!",
    mascotTryAgain: "Попробуй еще раз! Соедини все точки из шифра последовательно.",
    mascotFreeMode: "Здесь ты главный архитектор! Создавай любые яркие узоры и картины из резинок!",
    statusSelecting: "Нажми на любой колышек",
    statusConnecting: "Тяни резинку к следующему колышку или нажми «Закрепить»",
    targetGuide: "Соединяй точки по порядку!"
  }
};

// ==========================================================================
// 2. ВЕБ АУДИО СИНТЕЗАТОР (Web Audio API)
// ==========================================================================
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.musicInterval = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Звук натяжения резинки (пружинный твинг)
  playPluck(freq = 320) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.9, this.ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Звук защелкивания на штырьке
  playSnap() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Победный фанфар (мажорное арпеджио)
  playFanfare() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.11;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.28, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  // Звук отмены / очистки
  playWhoosh() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.16);
  }

  // Мягкая фоновая пентатоническая музыка (детская колыбельная/маримба)
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
    return this.musicEnabled;
  }

  startAmbientMusic() {
    this.init();
    if (!this.ctx) return;
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    const melodyPattern = [0, 2, 4, 3, 1, 4, 2, 5, 3, 2, 4, 0];

    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      const noteIdx = melodyPattern[this.musicStep % melodyPattern.length];
      const freq = pentatonic[noteIdx];
      this.musicStep++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    }, 700);
  }

  stopAmbientMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

// ==========================================================================
// 3. БАЗА ДАННЫХ ЗАДАНИЙ И ЭТНОПЕДАГОГИКИ
// ==========================================================================
const LEVELS_DB = {
  simple: [
    {
      id: "s1",
      nameKk: "Үшбұрыш",
      nameRu: "Треугольник",
      cipher: ["О", "К3", "Ж3", "О"],
      descKk: "Ортадан бастап, Қызыл және Сары нүктелерді қос!",
      descRu: "От центра соедини Красный и Желтый штырьки!",
      factKk: "Үшбұрыш — ең берік геометриялық фигура.",
      factRu: "Треугольник — самая устойчивая геометрическая фигура.",
      defaultColor: "#EF4444"
    },
    {
      id: "s2",
      nameKk: "Шаршы",
      nameRu: "Квадрат",
      cipher: ["К3", "Ж3", "Г3", "Ф3", "К3"],
      descKk: "Төрт бағыттағы бірдей 3-нүктелерді біріктір!",
      descRu: "Соедини третьи точки на четырех лучах!",
      factKk: "Шаршының барлық төрт қабырғасы бір-біріне тең.",
      factRu: "У квадрата все четыре стороны абсолютно равны.",
      defaultColor: "#0284C7"
    },
    {
      id: "s3",
      nameKk: "Ромб",
      nameRu: "Ромб",
      cipher: ["К4", "Ж2", "Г4", "Ф2", "К4"],
      descKk: "Жоғарғы К4, оң жақтағы Ж2, төменгі Г4 және сол жақтағы Ф2!",
      descRu: "Верх К4, правый луч Ж2, низ Г4 и левый луч Ф2!",
      factKk: "Ромб — созылған шаршыға ұқсайтын әдемі фигура.",
      factRu: "Ромб похож на вытянутый квадрат и часто украшает ковры.",
      defaultColor: "#F59E0B"
    },
    {
      id: "s4",
      nameKk: "Алтын жұлдыз",
      nameRu: "Золотая звезда",
      cipher: ["К4", "О2", "Ж4", "З2", "Г4", "С2", "Ф4", "Б2", "К4"],
      descKk: "Барлық 8 сәулені кезек-кезек биік және орташа етіп қос!",
      descRu: "Соединяй поочередно дальние и ближние точки всех 8 лучей!",
      factKk: "Жұлдыз — аспан мен биік армандардың символы.",
      factRu: "Звезда символизирует высокие мечты и ясное ночное небо.",
      defaultColor: "#F59E0B"
    }
  ],
  medium: [
    {
      id: "m1",
      nameKk: "«А» әрпі",
      nameRu: "Буква «А»",
      cipher: ["С4", "Ф2", "К4", "Ж2", "З4", "Ж2", "Ф2"],
      descKk: "Әліпбидің алғашқы әрпі — А әрпін құрастыр!",
      descRu: "Построй первую букву азбуки — красавицу «А»!",
      factKk: "«А» әрпінен ана, ата, алтын сөздері басталады.",
      factRu: "С буквы «А» начинаются самые важные и добрые слова.",
      defaultColor: "#10B981"
    },
    {
      id: "m2",
      nameKk: "«1» цифры",
      nameRu: "Цифра «1»",
      cipher: ["Б2", "К4", "Г4"],
      descKk: "Б2-ден төбеге К4-ке, одан тура төмен Г4-ке тарт!",
      descRu: "От Б2 вверх на К4, и затем прямо вниз до Г4!",
      factKk: "1 — барлық санаудың бастауы.",
      factRu: "Единица — начало счета и знак первого места!",
      defaultColor: "#3B82F6"
    },
    {
      id: "m3",
      nameKk: "«4» цифры",
      nameRu: "Цифра «4»",
      cipher: ["Ж3", "Ф3", "К4", "Г4"],
      descKk: "Ж3-тен солға Ф3-ке, жоғары К4-ке, одан тік төмен Г4-ке тарт!",
      descRu: "От Ж3 влево к Ф3, вверх к К4 и прямо вниз до Г4!",
      factKk: "Дүниенің төрт бұрышы: Солтүстік, Оңтүстік, Шығыс, Батыс.",
      factRu: "Четыре стороны света: Север, Юг, Восток и Запад.",
      defaultColor: "#8B5CF6"
    },
    {
      id: "m4",
      nameKk: "Құм сағаты",
      nameRu: "Песочные часы",
      cipher: ["Б4", "О4", "С4", "З4", "Б4"],
      descKk: "Құм сағаты сияқты айқасқан фигура жаса!",
      descRu: "Построй фигуру перекрещенных песочных часов!",
      factKk: "Уақыт — адам өміріндегі ең құнды байлық.",
      factRu: "Время — самое ценное богатство, учись ценить каждую минуту.",
      defaultColor: "#0284C7"
    }
  ],
  national: [
    {
      id: "n1",
      nameKk: "«Қошқар мүйіз» оюы",
      nameRu: "Орнамент «Қошқар мүйіз»",
      cipher: ["Ф2", "Б3", "К4", "О3", "Ж2", "О", "Ф2"],
      descKk: "Қазақ оюының басты түрі — береке мен күштің белгісі!",
      descRu: "Главный казахский орнамент (Бараний рог) — символ богатства и силы!",
      factKk: "Қошқар мүйіз оюы текеметтерде, киімдерде және ыдыстарда қолданылады.",
      factRu: "Орнамент «Қошқар мүйіз» украшает ковры, юрты и национальные костюмы.",
      defaultColor: "#00AFCA"
    },
    {
      id: "n2",
      nameKk: "«Түйе табан» оюы",
      nameRu: "Орнамент «Түйе табан»",
      cipher: ["О", "К2", "О3", "Ж3", "З2", "Г2", "С2", "Ф3", "Б3", "О"],
      descKk: "Түйенің ізін бейнелейтін ұзақ жол мен төзімділік оюы!",
      descRu: "След верблюда — древний степной знак верности и терпения!",
      factKk: "Түйе — қазақ даласының төрт түлігінің бірі, шөлге ең төзімді жануар.",
      factRu: "Верблюд — священное степное животное, преодолевающее любые расстояния.",
      defaultColor: "#F59E0B"
    },
    {
      id: "n3",
      nameKk: "«Бәйтерек» монументі",
      nameRu: "Монумент «Байтерек»",
      cipher: ["Г4", "О", "К4", "О2", "К4", "Б2", "О", "Г4"],
      descKk: "Астана төріндегі Бәйтерек ағашы мен Самұрықтың алтын жұмыртқасы!",
      descRu: "Символ столицы: древо жизни Байтерек и золотое яйцо птицы Самрук!",
      factKk: "Бәйтерек — Қазақстанның жаңаруы мен мәңгілік болашағының символы.",
      factRu: "Байтерек — символ молодой столицы Казахстана и древо жизни.",
      defaultColor: "#0284C7"
    },
    {
      id: "n4",
      nameKk: "«Киіз үй» (Шаңырақ)",
      nameRu: "«Юрта» и Шанырак",
      cipher: ["Ф3", "К4", "Ж3", "З3", "С3", "Ф3"],
      descKk: "Қасиетті киіз үй мен биік күмбезді құрастыр!",
      descRu: "Построй купол традиционной юрты — тепло родного очага!",
      factKk: "Шаңырақ — отбасы бірлігінің, бейбітшіліктің қастерлі бейнесі.",
      factRu: "Шанырак — символ домашнего уюта, мира и герба Казахстана.",
      defaultColor: "#EF4444"
    }
  ]
};

// ==========================================================================
// 4. ГЕОМЕТРИЯ ГЕОКОНТА (ВОСКОБОВИЧ / 8 СӘУЛЕ)
// ==========================================================================
// 8 лучей: К, О, Ж, З, Г, С, Ф, Б
const RAYS_DEF = [
  { id: "К", nameKk: "Қызыл", nameRu: "Красный", angleDeg: -90, color: "#EF4444" },
  { id: "О", nameKk: "Қызғылт сары", nameRu: "Оранжевый", angleDeg: -45, color: "#F97316" },
  { id: "Ж", nameKk: "Сары", nameRu: "Желтый", angleDeg: 0, color: "#EAB308" },
  { id: "З", nameKk: "Жасыл", nameRu: "Зеленый", angleDeg: 45, color: "#10B981" },
  { id: "Г", nameKk: "Көгілдір", nameRu: "Голубой", angleDeg: 90, color: "#06B6D4" },
  { id: "С", nameKk: "Көк", nameRu: "Синий", angleDeg: 135, color: "#3B82F6" },
  { id: "Ф", nameKk: "Күлгін", nameRu: "Фиолетовый", angleDeg: 180, color: "#8B5CF6" },
  { id: "Б", nameKk: "Ақ", nameRu: "Белый", angleDeg: 225, color: "#94A3B8" }
];

// Пресеты для свободного творчества
const FREE_PRESETS = [
  {
    nameKk: "⛵ Қайық",
    nameRu: "⛵ Кораблик",
    bands: [
      { points: ["Ф3", "Ж3", "З2", "С2", "Ф3"], color: "#0284C7" },
      { points: ["О", "К4", "Ж2", "О"], color: "#EF4444" }
    ]
  },
  {
    nameKk: "🏠 Үйшік",
    nameRu: "🏠 Домик",
    bands: [
      { points: ["Ф3", "К4", "Ж3", "Ф3"], color: "#EF4444" },
      { points: ["Ф3", "Ж3", "З3", "С3", "Ф3"], color: "#F59E0B" }
    ]
  },
  {
    nameKk: "🦋 Көбелек",
    nameRu: "🦋 Бабочка",
    bands: [
      { points: ["О", "Б3", "Ф4", "С3", "О"], color: "#8B5CF6" },
      { points: ["О", "О3", "Ж4", "З3", "О"], color: "#00AFCA" }
    ]
  },
  {
    nameKk: "🚀 Зымыран",
    nameRu: "🚀 Ракета",
    bands: [
      { points: ["К4", "О1", "Г2", "Б1", "К4"], color: "#3B82F6" },
      { points: ["Г2", "С3", "Г4", "З3", "Г2"], color: "#EF4444" }
    ]
  }
];

// ==========================================================================
// 5. ГЛАВНЫЙ КЛАСС ИГРЫ (GEOKONT ENGINE)
// ==========================================================================
class GeokontGame {
  constructor() {
    this.currentLang = 'kk';
    this.currentMode = 'learn'; // 'learn' | 'tasks' | 'free'
    this.sound = new SoundSynthesizer();

    // Canvas elements
    this.canvas = document.getElementById('geokontCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.previewCanvas = document.getElementById('targetPreviewCanvas');
    this.previewCtx = this.previewCanvas.getContext('2d');

    // Board Dimensions & Pegs Cache
    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.radius = 0;
    this.pegs = new Map(); // id -> { id, ray, level, x, y, hitR }

    // Band Drawing State
    this.activeColor = '#EF4444';
    this.completedBands = []; // Array of { points: [pegId, ...], color: string }
    this.currentBand = [];    // Array of pegId
    this.isDragging = false;
    this.dragPointer = null;  // { x, y }
    this.hoveredPeg = null;

    // Level State (Tasks Mode)
    this.currentCategory = 'simple';
    this.currentLevelIndex = 0;
    // localStorage может быть недоступен (приватный режим, запрет cookies) — игра не должна падать
    let savedLevels = [];
    try {
      savedLevels = JSON.parse(localStorage.getItem('geokont_completed_levels') || '[]');
    } catch (e) { savedLevels = []; }
    this.completedLevels = new Set(Array.isArray(savedLevels) ? savedLevels : []);
    this.hintHighlightedPeg = null;
    this.hintTimer = null;
    this.showGhostGuide = true; // Сұлба-көмекші на доске

    // Learn Mode Story Steps
    this.storyStep = 1;
    this.highlightRays = false;

    // Резинки каждого режима хранятся отдельно, чтобы смена вкладки не стирала работу ребенка
    this.savedBoards = {};

    // High Contrast State
    this.isHighContrast = false;

    this.initDOM();
    this.initEvents();
    this.resizeCanvas();
    this.updateLanguageUI();
    this.render();
  }

  // ------------------------------------------------------------------------
  // Инициализация интерфейса и привязка кнопок
  // ------------------------------------------------------------------------
  initDOM() {
    // Mode tabs
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.switchMode(mode);
      });
    });

    // Language buttons
    document.getElementById('btnLangKz').addEventListener('click', () => this.setLanguage('kk'));
    document.getElementById('btnLangRu').addEventListener('click', () => this.setLanguage('ru'));

    // High Contrast Button
    document.getElementById('contrastToggle').addEventListener('click', () => {
      this.isHighContrast = !this.isHighContrast;
      document.body.classList.toggle('contrast-mode', this.isHighContrast);
      this.render();
      if (this.currentMode === 'tasks') this.renderPreview();
    });

    // Sound & Music Toggles
    document.getElementById('soundToggle').addEventListener('click', () => {
      this.sound.soundEnabled = !this.sound.soundEnabled;
      document.getElementById('soundIcon').textContent = this.sound.soundEnabled ? '🔔' : '🔕';
      if (this.sound.soundEnabled) this.sound.playSnap();
    });

    document.getElementById('musicToggle').addEventListener('click', () => {
      const isPlaying = this.sound.toggleMusic();
      document.getElementById('musicIcon').textContent = isPlaying ? '🎶' : '🎵';
      document.getElementById('musicToggle').style.background = isPlaying ? 'rgba(245, 158, 11, 0.3)' : '';
    });

    // Color Palette
    document.querySelectorAll('.color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeColor = e.currentTarget.dataset.color;
        this.sound.playPluck(380);
      });
    });

    // Action Tools
    document.getElementById('btnUndo').addEventListener('click', () => this.undoStep());
    document.getElementById('btnFinishBand').addEventListener('click', () => this.finishCurrentBand());
    document.getElementById('btnClearBoard').addEventListener('click', () => this.clearAll());
    document.getElementById('btnExportImage').addEventListener('click', () => this.openExportModal());

    // Tasks Mode Category Selector
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.dataset.cat;
        this.currentLevelIndex = 0;
        this.renderCategoryLevels();
        this.loadCurrentLevel();
      });
    });

    // Tasks Check & Hint Buttons
    document.getElementById('btnCheck').addEventListener('click', () => this.checkTaskSolution());
    document.getElementById('btnHint').addEventListener('click', () => this.provideHint());

    const btnGhost = document.getElementById('btnToggleGhost');
    if (btnGhost) {
      btnGhost.addEventListener('click', () => {
        this.showGhostGuide = !this.showGhostGuide;
        btnGhost.classList.toggle('active', this.showGhostGuide);
        this.sound.playPluck(480);
        this.render();
      });
    }

    const btnSpeakLvl = document.getElementById('btnSpeakLevel');
    if (btnSpeakLvl) {
      btnSpeakLvl.addEventListener('click', () => {
        const levels = LEVELS_DB[this.currentCategory];
        const lvl = levels[this.currentLevelIndex];
        if (lvl) {
          const text = this.currentLang === 'kk'
            ? `«${lvl.nameKk}» фигурасын құрастыр! ${lvl.descKk}`
            : `Построй фигуру «${lvl.nameRu}»! ${lvl.descRu}`;
          this.speakText(text);
        }
      });
    }

    // Learn Mode Buttons
    document.getElementById('btnExploreRays').addEventListener('click', () => {
      this.highlightRays = !this.highlightRays;
      this.sound.playPluck(440);
      this.render();
    });

    // Speech synthesis button for Mascot
    document.getElementById('btnSpeakText').addEventListener('click', () => {
      const text = document.getElementById('mascotSpeechText').textContent;
      this.speakText(text);
    });

    // Celebration modal buttons
    document.getElementById('btnRepeatLevel').addEventListener('click', () => {
      document.getElementById('celebrationModal').style.display = 'none';
      this.clearAll();
    });

    document.getElementById('btnNextLevel').addEventListener('click', () => {
      document.getElementById('celebrationModal').style.display = 'none';
      this.goToNextLevel();
    });

    // Export Modal Buttons
    document.getElementById('btnCancelExport').addEventListener('click', () => {
      document.getElementById('exportModal').style.display = 'none';
    });

    document.getElementById('btnConfirmDownload').addEventListener('click', () => {
      this.downloadExportedPNG();
    });

    // Превью обновляется сразу, как только ребенок вводит имя
    document.getElementById('childNameInput').addEventListener('input', () => {
      this.updateExportPreview();
    });

    // Ray chips in legend click reaction
    document.querySelectorAll('.ray-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const rayId = e.currentTarget.dataset.ray;
        const rayDef = RAYS_DEF.find(r => r.id === rayId);
        if (rayDef) {
          const rayName = this.currentLang === 'kk' ? rayDef.nameKk : rayDef.nameRu;
          const msg = this.currentLang === 'kk'
            ? `«${rayDef.id}» сәулесі: ${rayName} түс!`
            : `Луч «${rayDef.id}»: цвет ${rayName}!`;
          this.setMascotText(msg);
          this.sound.playPluck(500);
        }
      });
    });

    this.renderCategoryLevels();
    this.renderFreePresets();
    this.initLearnStoryStepper();
  }

  // ------------------------------------------------------------------------
  // Настройка интерактивных событий (Мышь + Сенсорное управление Touch)
  // ------------------------------------------------------------------------
  initEvents() {
    const onResize = () => {
      this.resizeCanvas();
      this.render();
      if (this.currentMode === 'tasks') this.renderPreview();
    };
    window.addEventListener('resize', onResize);
    // Область поля меняется и без изменения окна (например, панель инструментов переносится на вторую строку)
    if (window.ResizeObserver) {
      new ResizeObserver(onResize).observe(this.canvas.parentElement);
    }

    // Значок координаты и подсветка не должны оставаться, когда указатель ушел с поля
    const clearHover = () => {
      this.hoveredPeg = null;
      document.getElementById('hoverPegBadge').style.display = 'none';
    };

    // Mouse & Touch unified coordinates
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (this.canvas.width / rect.width),
        y: (clientY - rect.top) * (this.canvas.height / rect.height)
      };
    };

    // Pointer Down (Start dragging or tap peg)
    const handleStart = (pos) => {
      const peg = this.findPegAt(pos.x, pos.y);
      if (peg) {
        this.sound.playSnap();
        if (this.currentBand.length === 0) {
          // Начинаем новую резинку
          this.currentBand.push(peg.id);
          this.isDragging = true;
          this.dragPointer = { x: pos.x, y: pos.y };
        } else {
          // Уже есть незаконченная резинка
          const lastPeg = this.currentBand[this.currentBand.length - 1];
          if (lastPeg === peg.id) {
            // Клик по той же точке — завершаем
            this.finishCurrentBand();
          } else if (this.currentBand[0] === peg.id && this.currentBand.length >= 3) {
            // Клик по начальной точке — замыкаем фигуру
            this.currentBand.push(peg.id);
            this.finishCurrentBand();
          } else {
            this.currentBand.push(peg.id);
            this.sound.playPluck();
            this.isDragging = true;
            this.dragPointer = { x: pos.x, y: pos.y };
          }
        }
      } else {
        // Клик в пустоту: если тянули незакрепленную резинку — отпускаем
        if (this.currentBand.length > 0) {
          this.dragPointer = null;
          this.isDragging = false;
        }
      }
      this.updateHUD();
      this.render();
    };

    // Pointer Move
    const handleMove = (pos) => {
      const peg = this.findPegAt(pos.x, pos.y);
      this.hoveredPeg = peg ? peg.id : null;

      const badge = document.getElementById('hoverPegBadge');
      if (peg) {
        badge.style.display = 'block';
        badge.style.left = `${pos.x / (this.canvas.width / this.canvas.clientWidth)}px`;
        badge.style.top = `${pos.y / (this.canvas.height / this.canvas.clientHeight)}px`;
        badge.textContent = peg.id;
      } else {
        badge.style.display = 'none';
      }

      if (this.isDragging && this.currentBand.length > 0) {
        this.dragPointer = { x: pos.x, y: pos.y };
      }
      this.render();
    };

    // Pointer Up (Release stretch)
    const handleEnd = (pos) => {
      if (this.isDragging && this.currentBand.length > 0) {
        const peg = this.findPegAt(pos.x, pos.y);
        if (peg) {
          const lastPeg = this.currentBand[this.currentBand.length - 1];
          if (peg.id !== lastPeg) {
            this.currentBand.push(peg.id);
            this.sound.playPluck(420);
            // Если вернулись в начало — замыкаем
            if (this.currentBand.length >= 4 && peg.id === this.currentBand[0]) {
              this.finishCurrentBand();
            }
          }
        }
      }
      this.isDragging = false;
      this.dragPointer = null;
      this.updateHUD();
      this.render();
    };

    // Mouse Listeners
    this.canvas.addEventListener('mousedown', (e) => {
      e.preventDefault();
      handleStart(getPos(e));
    });

    window.addEventListener('mousemove', (e) => {
      if (e.target === this.canvas || this.isDragging) {
        handleMove(getPos(e));
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (this.isDragging) {
        handleEnd(getPos(e));
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      clearHover();
      this.render();
    });

    // Touch Listeners (prevent screen scrolling while playing)
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleStart(getPos(e));
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(getPos(e));
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const rect = this.canvas.getBoundingClientRect();
      const pos = {
        x: (touch.clientX - rect.left) * (this.canvas.width / rect.width),
        y: (touch.clientY - rect.top) * (this.canvas.height / rect.height)
      };
      clearHover();
      handleEnd(pos);
    }, { passive: false });

    // Система может прервать касание (жест, уведомление) — резинка не должна остаться «прилипшей»
    this.canvas.addEventListener('touchcancel', () => {
      clearHover();
      this.isDragging = false;
      this.dragPointer = null;
      this.render();
    });
  }

  // ------------------------------------------------------------------------
  // Расчет адаптивных размеров полотна и штырьков
  // ------------------------------------------------------------------------
  resizeCanvas() {
    const parent = this.canvas.parentElement;
    const size = Math.min(parent.clientWidth, parent.clientHeight) || 540;
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    // CSS-размер фиксируем отдельно, иначе при масштабе Windows 125–150% (dpr > 1)
    // холст становится больше окна и края поля обрезаются
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = (this.width / 2) * 0.88;

    this.rebuildPegsCoordinates();
  }

  // Построение 33 координат Геоконта: Центр 'О' + 8 лучей по 4 штырька
  rebuildPegsCoordinates() {
    this.pegs.clear();

    // Большой радиус кликабельности для детей (26-30px с учетом DPR)
    const hitRadius = Math.max(26, this.radius * 0.08);

    // Центр «О» (или «Ц»)
    this.pegs.set('О', {
      id: 'О',
      ray: 'Ц',
      level: 0,
      x: this.centerX,
      y: this.centerY,
      color: '#F59E0B',
      hitR: hitRadius * 1.2
    });

    // Коэффициенты отдаления от центра (Воскобович: 1, 2, 3, 4)
    const distRatios = [0.26, 0.50, 0.74, 0.96];

    RAYS_DEF.forEach(ray => {
      const rad = (ray.angleDeg * Math.PI) / 180;
      distRatios.forEach((ratio, idx) => {
        const level = idx + 1;
        const pegId = `${ray.id}${level}`;
        const dist = this.radius * ratio;
        const x = this.centerX + Math.cos(rad) * dist;
        const y = this.centerY + Math.sin(rad) * dist;

        this.pegs.set(pegId, {
          id: pegId,
          ray: ray.id,
          level: level,
          x: x,
          y: y,
          color: ray.color,
          hitR: hitRadius
        });
      });
    });
  }

  // Поиск ближайшего штырька с защитой от промаха пальцем
  findPegAt(x, y) {
    let closest = null;
    let minDist = Infinity;

    for (const [id, peg] of this.pegs.entries()) {
      const dx = peg.x - x;
      const dy = peg.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= peg.hitR && dist < minDist) {
        minDist = dist;
        closest = peg;
      }
    }
    return closest;
  }

  // ------------------------------------------------------------------------
  // Логика работы с резинками (Создание, Отмена, Очистка)
  // ------------------------------------------------------------------------
  finishCurrentBand() {
    if (this.currentBand.length >= 2) {
      this.completedBands.push({
        points: [...this.currentBand],
        color: this.activeColor
      });
      this.sound.playSnap();
      this.currentBand = [];
      this.updateHUD();
      this.render();

      if (this.currentMode === 'tasks') {
        this.checkTaskSolution(); // Автопроверка: ребенок сразу узнает, получилась ли фигура
      }
    } else {
      this.currentBand = [];
      this.updateHUD();
      this.render();
    }
  }

  undoStep() {
    if (this.currentBand.length > 0) {
      this.currentBand.pop();
      this.sound.playWhoosh();
    } else if (this.completedBands.length > 0) {
      this.completedBands.pop();
      this.sound.playWhoosh();
    }
    this.updateHUD();
    this.render();
  }

  clearAll() {
    this.completedBands = [];
    this.currentBand = [];
    this.dragPointer = null;
    this.isDragging = false;
    this.sound.playWhoosh();
    this.updateHUD();
    this.render();
  }

  updateHUD() {
    const pill = document.getElementById('drawingStatusPill');
    const txt = document.getElementById('drawingStatusText');
    const bandsCount = document.getElementById('bandsCount');

    if (bandsCount) {
      bandsCount.textContent = this.completedBands.length + (this.currentBand.length >= 2 ? 1 : 0);
    }

    if (this.currentBand.length > 0) {
      pill.style.display = 'flex';
      txt.textContent = `${this.t('statusConnecting')} (${this.currentBand.join(' ➔ ')})`;
    } else {
      pill.style.display = 'none';
    }

    // Обновление интерактивного прогресса шагов шифра
    if (this.currentMode === 'tasks') {
      this.updateCipherChipsProgress();
    }
  }

  // Индекс следующей точки шифра: первая ошибка в резинке или следующий шаг, если ошибок нет
  getNextCipherIndex(lvl) {
    const wrongIdx = this.currentBand.findIndex((id, i) => id !== lvl.cipher[i]);
    return wrongIdx >= 0 ? wrongIdx : this.currentBand.length;
  }

  // Обновление интерактивных цветных карточек шагов шифра
  updateCipherChipsProgress() {
    if (this.currentMode !== 'tasks') return;
    const levels = LEVELS_DB[this.currentCategory];
    const lvl = levels[this.currentLevelIndex];
    if (!lvl) return;

    const chipsBox = document.getElementById('cipherChips');
    if (!chipsBox) return;

    const targetCipher = lvl.cipher;
    const nextIdx = this.getNextCipherIndex(lvl);

    chipsBox.innerHTML = targetCipher.map((pt, i) => {
      const peg = this.pegs.get(pt);
      const rayDef = peg && peg.ray !== 'Ц' ? RAYS_DEF.find(r => r.id === peg.ray) : null;
      let rayColor = pt === 'О' ? '#F59E0B' : (rayDef ? rayDef.color : '#0284C7');
      if (pt.startsWith('Б')) rayColor = '#64748B'; // Серый бейдж для контраста Белого луча

      let statusClass = '';
      let icon = '';
      if (i < nextIdx) {
        statusClass = 'completed';
        icon = '✓ ';
      } else if (i === nextIdx) {
        statusClass = 'next-target';
        icon = '🎯 ';
      }

      return `
        <span class="cipher-node ${statusClass}" style="background-color: ${statusClass === 'completed' ? '#10B981' : rayColor};" data-peg="${pt}" title="${pt}">
          <span>${icon}${pt}</span>
        </span>
        ${i < targetCipher.length - 1 ? '<span class="cipher-arrow">➔</span>' : ''}
      `;
    }).join('');
  }

  // ------------------------------------------------------------------------
  // РЕНДЕРИНГ ГЕОКОНТА (Canvas 2D)
  // ------------------------------------------------------------------------
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Фоновая фактура доски
    this.renderBoardBackground(ctx);

    // 8 Лучей Воскобовича (с цветными маяками-буквами на ободе)
    this.renderRays(ctx);

    // Соединительные концентрические окружности (с номерами уровней 1, 2, 3, 4)
    this.renderConcentricCircles(ctx);

    // Полупрозрачный контур-сұлба (подсказка для ребенка в заданиях)
    this.renderGhostGuide(ctx);

    // Завершенные натянутые резинки
    this.completedBands.forEach(band => {
      this.renderBandPolygon(ctx, band.points, band.color, true);
    });

    // Текущая натягиваемая резинка + эластичный хвост за пальцем
    if (this.currentBand.length > 0) {
      const activePts = [...this.currentBand];
      this.renderBandPolygon(ctx, activePts, this.activeColor, false);

      // Эластичная нить до указателя
      if (this.dragPointer) {
        const lastPeg = this.pegs.get(activePts[activePts.length - 1]);
        if (lastPeg) {
          ctx.save();
          ctx.strokeStyle = this.activeColor;
          ctx.lineWidth = Math.max(5, this.radius * 0.024);
          ctx.lineCap = 'round';
          ctx.shadowColor = this.activeColor;
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.moveTo(lastPeg.x, lastPeg.y);
          ctx.lineTo(this.dragPointer.x, this.dragPointer.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Штырьки (Колышки с объемным 3D эффектом и маяками)
    this.renderPegs(ctx);

    // Подсветка подсказки для задания
    if (this.hintHighlightedPeg) {
      const p = this.pegs.get(this.hintHighlightedPeg);
      if (p) {
        ctx.save();
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.hitR * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Отрисовка полупрозрачного контура-сұлба на игровом поле
  renderGhostGuide(ctx) {
    if (this.currentMode !== 'tasks' || !this.showGhostGuide) return;
    const levels = LEVELS_DB[this.currentCategory];
    const lvl = levels[this.currentLevelIndex];
    if (!lvl || !lvl.cipher || lvl.cipher.length < 2) return;

    const coords = lvl.cipher.map(id => this.pegs.get(id)).filter(Boolean);
    if (coords.length < 2) return;

    ctx.save();
    // Мягкая заливка силуэта
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    // Заливаем только замкнутые фигуры: у букв и цифр заливка рисует лишнюю сторону
    if (lvl.cipher[0] === lvl.cipher[lvl.cipher.length - 1]) {
      ctx.fillStyle = lvl.defaultColor || '#00AFCA';
      ctx.globalAlpha = 0.12;
      ctx.fill();
    }

    // Пунктирная лента контура
    ctx.strokeStyle = lvl.defaultColor || '#00AFCA';
    ctx.lineWidth = Math.max(3.5, this.radius * 0.016);
    ctx.setLineDash([8, 6]);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.65;
    ctx.stroke();

    ctx.restore();
  }

  // Фоновый круг доски
  renderBoardBackground(ctx) {
    const isDark = this.isHighContrast;

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius * 1.05, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? '#0A0F1D' : '#FFFFFF';
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = isDark ? '#FBBF24' : '#E2E8F0';
    ctx.stroke();

    // Казахский национальный орнаментальный акцент по краю поля
    ctx.strokeStyle = isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(0, 175, 202, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius * 1.02, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Отрисовка 8 цветных лучей с яркими маяками на краю поля
  renderRays(ctx) {
    RAYS_DEF.forEach(ray => {
      const rad = (ray.angleDeg * Math.PI) / 180;
      const endX = this.centerX + Math.cos(rad) * (this.radius * 0.98);
      const endY = this.centerY + Math.sin(rad) * (this.radius * 0.98);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.centerX, this.centerY);
      ctx.lineTo(endX, endY);

      if (this.highlightRays) {
        ctx.strokeStyle = ray.color;
        ctx.lineWidth = 5;
        ctx.shadowColor = ray.color;
        ctx.shadowBlur = 10;
      } else {
        // Мягкая цветная траектория луча, чтобы ребенок видел цвет каждого направления
        ctx.strokeStyle = this.isHighContrast ? ray.color : ray.color;
        ctx.globalAlpha = this.isHighContrast ? 0.35 : 0.25;
        ctx.lineWidth = Math.max(3, this.radius * 0.012);
      }
      ctx.stroke();
      ctx.restore();

      // Яркий круглый маяк-буква на краю диска
      const badgeR = Math.max(14, this.radius * 0.046);
      // Маяк вынесен за 4-й штырек, иначе штырек закрывает букву луча
      const bx = this.centerX + Math.cos(rad) * (this.radius * 1.075);
      const by = this.centerY + Math.sin(rad) * (this.radius * 1.075);

      ctx.save();
      // Тень маяка
      ctx.beginPath();
      ctx.arc(bx + 1, by + 2, badgeR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fill();

      // Круг маяка
      ctx.beginPath();
      ctx.arc(bx, by, badgeR, 0, Math.PI * 2);
      ctx.fillStyle = ray.color;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Буква луча (К, О, Ж, З, Г, С, Ф, Б)
      ctx.fillStyle = (ray.id === 'Б' || ray.id === 'Ж') ? '#0F172A' : '#FFFFFF';
      ctx.font = `900 ${Math.max(12, badgeR * 1.05)}px 'Nunito', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ray.id, bx, by);
      ctx.restore();
    });
  }

  // Концентрические окружности (с четкими номерами кругов 1, 2, 3, 4)
  renderConcentricCircles(ctx) {
    const distRatios = [0.26, 0.50, 0.74, 0.96];
    ctx.save();
    ctx.strokeStyle = this.isHighContrast ? 'rgba(251, 191, 36, 0.25)' : 'rgba(2, 132, 199, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    distRatios.forEach(ratio => {
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.radius * ratio, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();

    // Маркеры-номера уровней (1, 2, 3, 4) для наглядности ребенку
    distRatios.forEach((ratio, idx) => {
      const ringNum = (idx + 1).toString();
      // Размещаем маркер посередине между лучами Г и С, чтобы он не перекрывал штырьки
      const ringDist = this.radius * ratio;
      const angle = (112.5 * Math.PI) / 180;
      const rx = this.centerX + Math.cos(angle) * ringDist;
      const ry = this.centerY + Math.sin(angle) * ringDist;
      const tagR = Math.max(11, this.radius * 0.03);

      ctx.save();
      ctx.beginPath();
      ctx.arc(rx, ry, tagR, 0, Math.PI * 2);
      ctx.fillStyle = this.isHighContrast ? '#1E293B' : '#E0F2FE';
      ctx.fill();

      ctx.strokeStyle = this.isHighContrast ? '#38BDF8' : '#0284C7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = this.isHighContrast ? '#FFFFFF' : '#0284C7';
      ctx.font = `bold ${Math.max(10, tagR * 1.05)}px 'Nunito', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ringNum, rx, ry);
      ctx.restore();
    });
  }

  // Отрисовка натянутой цветной резинки
  renderBandPolygon(ctx, pointIds, color, isClosed) {
    if (pointIds.length < 2) return;

    const coords = pointIds.map(id => this.pegs.get(id)).filter(Boolean);
    if (coords.length < 2) return;

    ctx.save();

    // Заливка полупрозрачным цветом, если полигон замкнут
    const isActuallyClosed = isClosed && coords[0].id === coords[coords.length - 1].id;
    if (isActuallyClosed && coords.length >= 4) {
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 1; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.22;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    // Линии натянутой резинки
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(6, this.radius * 0.026);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.stroke();

    // Внутренняя бликовая линия для эффекта латекса / объема
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = Math.max(2, this.radius * 0.008);
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.stroke();

    ctx.restore();
  }

  // Отрисовка всех штырьков с детскими крупными подписями и 3D эффектом
  renderPegs(ctx) {
    const isDark = this.isHighContrast;
    const basePegR = Math.max(10, this.radius * 0.038);

    // Определяем следующую целевую точку для задания (маяк-подсказка)
    let nextTargetPegId = null;
    if (this.currentMode === 'tasks') {
      const levels = LEVELS_DB[this.currentCategory];
      const lvl = levels[this.currentLevelIndex];
      if (lvl) {
        nextTargetPegId = lvl.cipher[this.getNextCipherIndex(lvl)] || null;
      }
    }

    this.pegs.forEach(peg => {
      const isCenter = peg.id === 'О';
      const isHovered = this.hoveredPeg === peg.id;
      const isSelected = this.currentBand.includes(peg.id);
      const isNextTarget = nextTargetPegId === peg.id;
      const pegR = isCenter ? basePegR * 1.35 : (isHovered ? basePegR * 1.25 : basePegR);

      ctx.save();

      // Пульсирующий маяк следующей нужной точки в задании
      if (isNextTarget) {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, pegR * 1.9, 0, Math.PI * 2);
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
        ctx.fill();
      }

      // Тень штырька
      ctx.beginPath();
      ctx.arc(peg.x + 2, peg.y + 3, pegR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fill();

      // Основной обод штырька (объемная шляпка)
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, pegR, 0, Math.PI * 2);
      ctx.fillStyle = isCenter ? '#F59E0B' : (isDark ? '#1E293B' : '#FFFFFF');
      ctx.fill();

      ctx.lineWidth = isCenter ? 3.5 : 2.5;
      ctx.strokeStyle = peg.color || '#0284C7';
      ctx.stroke();

      // Внутренняя выпуклая цветная головка штырька
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, pegR * 0.52, 0, Math.PI * 2);
      ctx.fillStyle = peg.color || '#0284C7';
      ctx.fill();

      // Блик на колышке
      ctx.beginPath();
      ctx.arc(peg.x - pegR * 0.2, peg.y - pegR * 0.2, pegR * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();

      // Пульсация выделения выбранной точки
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, pegR * 1.6, 0, Math.PI * 2);
        ctx.strokeStyle = this.activeColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Текстовая подпись координат (К1, К2, О1...)
      const fontSize = Math.max(13, this.radius * 0.05);
      ctx.font = `bold ${fontSize}px 'Nunito', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Смещение текста наружу
      let textOffset = { x: 0, y: -(pegR + 11) };
      // У верхнего штырька подпись сбоку, иначе она закрывает маяк луча «К»
      if (peg.id === 'К4') {
        textOffset = { x: pegR + fontSize * 1.1, y: 0 };
      }
      if (isCenter) {
        textOffset = { x: 0, y: 0 };
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(peg.id, peg.x + textOffset.x, peg.y + textOffset.y);
      } else {
        // Контрастная плашка-пилюля под координатой
        const txt = peg.id;
        const metrics = ctx.measureText(txt);
        const tw = metrics.width + 6;
        const th = fontSize + 4;
        const px = peg.x + textOffset.x - tw / 2;
        const py = peg.y + textOffset.y - th / 2;

        ctx.fillStyle = isDark ? '#1E293B' : '#FFFFFF';
        ctx.strokeStyle = isDark ? '#475569' : '#CBD5E1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(px, py, tw, th, 4);
        } else {
          ctx.rect(px, py, tw, th);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isDark ? '#FFFFFF' : '#0F172A';
        ctx.fillText(txt, peg.x + textOffset.x, peg.y + textOffset.y);
      }

      ctx.restore();
    });
  }

  // ------------------------------------------------------------------------
  // РЕЖИМ 1: ОБУЧЕНИЕ И СКАЗКА (ОҚЫТУ МЕН ЕРТЕК)
  // ------------------------------------------------------------------------
  initLearnStoryStepper() {
    const container = document.getElementById('storyStepper');
    const steps = [
      {
        num: 1,
        titleKk: "1. Геоконт деген не?",
        descKk: "Бұл — сиқырлы 8 сәулелі координата тақтасы және түрлі-түсті резеңкелер!",
        titleRu: "1. Что такое Геоконт?",
        descRu: "Это волшебная доска с 8 лучами и яркими резиночками!"
      },
      {
        num: 2,
        titleKk: "2. Орталық нүкте — «О»",
        descKk: "Дәл ортада сары түсті «О» штырькасы орналасқан. Ол барлық сәуленің бастауы.",
        titleRu: "2. Центр поля — «О»",
        descRu: "В самом центре находится желтый штырек «О». Это начало всех лучей."
      },
      {
        num: 3,
        titleKk: "3. 8 Түрлі-түсті сәуле",
        descKk: "К (Қызыл), О (Қызғылт сары), Ж (Сары), З (Жасыл), Г (Көгілдір), С (Көк), Ф (Күлгін), Б (Ақ).",
        titleRu: "3. 8 Цветных лучей",
        descRu: "К (Красный), О (Оранжевый), Ж (Желтый), З (Зеленый), Г (Голубой), С (Синий), Ф (Фиолетовый), Б (Белый)."
      },
      {
        num: 4,
        titleKk: "4. Нүктелер координатасы",
        descKk: "Әр сәуледе 1-ден 4-ке дейін нүктелер бар. Мысалы: К1, К2, К3, К4. Саусағыңмен тарт!",
        titleRu: "4. Координаты точек",
        descRu: "На каждом луче 4 штырька (К1, К2, К3, К4). Натягивай резиночки пальцем!"
      }
    ];

    container.innerHTML = steps.map(s => `
      <div class="story-step-item ${s.num === this.storyStep ? 'active' : ''}" data-step="${s.num}">
        <div class="step-num">${s.num}</div>
        <div class="step-content">
          <strong>${this.currentLang === 'kk' ? s.titleKk : s.titleRu}</strong>
          <div>${this.currentLang === 'kk' ? s.descKk : s.descRu}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.story-step-item').forEach(el => {
      el.addEventListener('click', (e) => {
        container.querySelectorAll('.story-step-item').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const num = parseInt(e.currentTarget.dataset.step);
        this.selectStoryStep(num);
      });
    });
  }

  selectStoryStep(stepNum) {
    this.sound.playPluck(460);
    this.applyStoryStep(stepNum);
  }

  applyStoryStep(stepNum) {
    this.storyStep = stepNum;
    this.setMascotText(this.getStoryStepText(stepNum));
    // Каждый шаг начинается с чистого поля без подсветок предыдущего шага
    this.highlightRays = stepNum === 3;
    this.hintHighlightedPeg = stepNum === 2 ? 'О' : (stepNum === 4 ? 'К3' : null);
    this.render();
  }

  getStoryStepText(stepNum) {
    if (stepNum === 2) {
      return this.currentLang === 'kk'
        ? "Орталық «О» штырькасына назар аудар! Ол күн сияқты жарқырап тұр!"
        : "Посмотри на центральный штырек «О»! Он светит как теплое солнышко!";
    }
    if (stepNum === 3) return this.t('mascotLearnRays');
    if (stepNum === 4) return this.t('mascotStretchHelp');
    return this.t('mascotWelcome');
  }

  // ------------------------------------------------------------------------
  // РЕЖИМ 2: ШИФР ТАПСЫРМАЛАРЫ (ШИФР-ЗАДАЧИ)
  // ------------------------------------------------------------------------
  renderCategoryLevels() {
    const grid = document.getElementById('levelsGrid');
    const levels = LEVELS_DB[this.currentCategory] || [];

    grid.innerHTML = levels.map((lvl, idx) => {
      const isDone = this.completedLevels.has(lvl.id);
      const isActive = idx === this.currentLevelIndex;
      return `
        <div class="level-chip ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-idx="${idx}">
          <span>${idx + 1}</span>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.level-chip').forEach(el => {
      el.addEventListener('click', (e) => {
        this.currentLevelIndex = parseInt(e.currentTarget.dataset.idx);
        grid.querySelectorAll('.level-chip').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.loadCurrentLevel();
      });
    });
  }

  // keepBoard = true — только обновить тексты (например, при смене языка), не стирая работу ребенка
  loadCurrentLevel(keepBoard = false) {
    const levels = LEVELS_DB[this.currentCategory];
    const lvl = levels[this.currentLevelIndex];
    if (!lvl) return;

    if (!keepBoard) {
      // Сброс текущей доски для чистоты задания
      clearTimeout(this.hintTimer);
      this.hintHighlightedPeg = null;
      this.clearAll();
      this.activeColor = lvl.defaultColor || '#EF4444';
      this.syncPaletteUI();
    }

    // Обновление карточки задания
    document.getElementById('targetLevelBadge').textContent = `${this.currentLang === 'kk' ? 'Деңгей' : 'Уровень'} ${this.currentLevelIndex + 1}`;
    document.getElementById('targetLevelName').textContent = this.currentLang === 'kk' ? lvl.nameKk : lvl.nameRu;
    document.getElementById('targetGuideText').textContent = this.currentLang === 'kk' ? lvl.descKk : lvl.descRu;

    // Отрисовка интерактивного шифра с цветными шагами
    this.updateCipherChipsProgress();

    // Этнопедагогический факт
    if (lvl.factKk) {
      document.getElementById('ethnoNoteText').textContent = this.currentLang === 'kk' ? lvl.factKk : lvl.factRu;
    }

    // Сообщение Барсенка Алана
    // Сам шифр уже показан в карточке задания, поэтому маскот его не повторяет
    this.setMascotText(this.currentLang === 'kk' ? lvl.descKk : lvl.descRu);

    this.renderPreview();
  }

  // Отрисовка мини-превью целевой фигуры
  renderPreview() {
    const levels = LEVELS_DB[this.currentCategory];
    const lvl = levels[this.currentLevelIndex];
    if (!lvl) return;

    const ctx = this.previewCtx;
    const w = this.previewCanvas.width;
    const h = this.previewCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const r = (w / 2) * 0.82;

    // Легкая сетка
    ctx.strokeStyle = this.isHighContrast ? '#334155' : '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Преобразование точек шифра в координаты мини-холста
    const coords = lvl.cipher.map(id => {
      const p = this.pegs.get(id);
      if (!p) return null;
      const nx = (p.x - this.centerX) / this.radius;
      const ny = (p.y - this.centerY) / this.radius;
      return { x: cx + nx * r, y: cy + ny * r };
    }).filter(Boolean);

    if (coords.length >= 2) {
      // Заливка
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 1; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[i].y);
      }
      if (lvl.cipher[0] === lvl.cipher[lvl.cipher.length - 1]) {
        ctx.fillStyle = lvl.defaultColor || '#0284C7';
        ctx.globalAlpha = 0.25;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Контур
      ctx.strokeStyle = lvl.defaultColor || '#0284C7';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Точки
      coords.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }
  }

  // Проверка решения (инвариантна к начальной точке и направлению обхода)
  checkTaskSolution(showFailureAlert = true) {
    const levels = LEVELS_DB[this.currentCategory];
    const lvl = levels[this.currentLevelIndex];
    if (!lvl) return;

    const targetCipher = lvl.cipher;

    // Ищем среди завершенных резинок или текущей
    const allUserBands = [...this.completedBands.map(b => b.points)];
    if (this.currentBand.length >= 2) {
      allUserBands.push(this.currentBand);
    }

    let isMatched = false;
    for (const band of allUserBands) {
      if (this.isPolygonMatching(band, targetCipher)) {
        isMatched = true;
        break;
      }
    }

    if (isMatched) {
      this.sound.playFanfare();
      const isNewCompletion = !this.completedLevels.has(lvl.id);
      this.completedLevels.add(lvl.id);
      try {
        localStorage.setItem('geokont_completed_levels', JSON.stringify([...this.completedLevels]));
      } catch (e) { /* прогресс просто не сохранится между сессиями */ }
      this.renderCategoryLevels();
      // Финал показываем один раз: в момент, когда пройдено последнее из всех заданий
      this.showCelebrationModal(isNewCompletion && this.areAllLevelsCompleted());
    } else if (showFailureAlert) {
      this.sound.playWhoosh();
      this.setMascotText(this.t('mascotTryAgain'));
      const bubble = document.getElementById('mascotBubble');
      bubble.classList.remove('bubble-alert');
      void bubble.offsetWidth; // перезапуск анимации при повторной ошибке
      bubble.classList.add('bubble-alert');
    }
  }

  // Сравнение полигонов с учетом циклического сдвига и реверса
  isPolygonMatching(bandA, bandB) {
    if (!bandA || !bandB) return false;

    // Незамкнутая линия (буква, цифра): циклический сдвиг рисует другую фигуру,
    // поэтому допускаем только точное совпадение или обратный порядок
    const isClosedB = bandB.length > 2 && bandB[0] === bandB[bandB.length - 1];
    if (!isClosedB) {
      const same = (x, y) => x.length === y.length && x.every((v, i) => v === y[i]);
      return same(bandA, bandB) || same(bandA, [...bandB].reverse());
    }

    // Замкнутую фигуру нужно довести до начальной точки, незамкнутая линия не засчитывается
    if (bandA.length <= 2 || bandA[0] !== bandA[bandA.length - 1]) return false;

    // Очистим замыкающий дубль, если он равен началу
    const cleanA =(bandA[0] === bandA[bandA.length - 1] && bandA.length > 2) ? bandA.slice(0, -1) : [...bandA];
    const cleanB = (bandB[0] === bandB[bandB.length - 1] && bandB.length > 2) ? bandB.slice(0, -1) : [...bandB];

    if (cleanA.length !== cleanB.length) return false;

    const n = cleanA.length;
    // Прямой обход
    for (let offset = 0; offset < n; offset++) {
      let match = true;
      for (let i = 0; i < n; i++) {
        if (cleanA[i] !== cleanB[(i + offset) % n]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }

    // Обратный обход
    const revB = [...cleanB].reverse();
    for (let offset = 0; offset < n; offset++) {
      let match = true;
      for (let i = 0; i < n; i++) {
        if (cleanA[i] !== revB[(i + offset) % n]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }

    return false;
  }

  provideHint() {
    const levels = LEVELS_DB[this.currentCategory];
    const lvl = levels[this.currentLevelIndex];
    if (!lvl) return;

    // Ищем, какую следующую точку из шифра нужно соединить
    const nextIdx = this.getNextCipherIndex(lvl);
    const nextPeg = lvl.cipher[nextIdx];
    const hasMistake = nextIdx < this.currentBand.length;

    this.hintHighlightedPeg = nextPeg || null;
    this.sound.playPluck(520);
    if (!nextPeg) {
      // Все точки линии уже пройдены — осталось закрепить резинку
      this.setMascotText(this.currentLang === 'kk'
        ? "Барлық нүкте дайын! Енді «Бекіту» түймесін бас!"
        : "Все точки пройдены! Теперь нажми «Закрепить»!");
    } else if (hasMistake) {
      this.setMascotText(this.currentLang === 'kk'
        ? `«${this.currentBand[nextIdx]}» нүктесі шифр бойынша емес. «Болдырмау» түймесін бас, бұл жерде «${nextPeg}» керек!`
        : `Точка «${this.currentBand[nextIdx]}» не по шифру. Нажми «Отменить», здесь нужна «${nextPeg}»!`);
    } else {
      this.setMascotText(this.currentLang === 'kk'
        ? `Көмек: келесі нүкте — «${nextPeg}»!`
        : `Подсказка: следующая точка — «${nextPeg}»!`);
    }
    this.render();

    // Сбрасываем прошлый таймер, иначе старая подсказка гасит новую раньше времени
    clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => {
      this.hintHighlightedPeg = null;
      this.render();
    }, 3500);
  }

  areAllLevelsCompleted() {
    return Object.values(LEVELS_DB).flat().every(lvl => this.completedLevels.has(lvl.id));
  }

  showCelebrationModal(isFinale = false) {
    const modal = document.getElementById('celebrationModal');
    modal.style.display = 'flex';
    this.isFinaleShown = isFinale;

    const total = Object.values(LEVELS_DB).flat().length;
    const kk = this.currentLang === 'kk';
    if (isFinale) {
      document.getElementById('celebrationTitle').textContent = kk
        ? "Құттықтаймыз! Сен — Геоконт шеберісің!"
        : "Поздравляем! Ты — мастер Геоконта!";
      document.getElementById('celebrationMessage').textContent = kk
        ? `Барлық ${total} тапсырма орындалды! Енді өз суретіңді салып көр.`
        : `Все ${total} заданий выполнены! Теперь нарисуй свою собственную картину.`;
    } else {
      document.getElementById('celebrationTitle').textContent = kk
        ? "Жарайсың! Өте жақсы!"
        : "Блестяще! Молодец!";
      document.getElementById('celebrationMessage').textContent = kk
        ? "Сен фигураны дәл шифр бойынша құрастырдың!"
        : "Фигура собрана в точности по шифру!";
    }

    document.querySelector('#btnNextLevel [data-i18n]').textContent = isFinale
      ? (kk ? "Еркін шығармашылыққа өту" : "Перейти к творчеству")
      : this.t('nextLevelBtn');

    this.launchConfetti();
  }

  goToNextLevel() {
    if (this.isFinaleShown) {
      this.isFinaleShown = false;
      this.switchMode('free');
      return;
    }

    const levels = LEVELS_DB[this.currentCategory];
    if (this.currentLevelIndex < levels.length - 1) {
      this.currentLevelIndex++;
    } else {
      // Переходим к следующей категории, а после последней — к первому непройденному заданию
      if (this.currentCategory === 'simple') {
        this.currentCategory = 'medium';
        this.currentLevelIndex = 0;
      } else if (this.currentCategory === 'medium') {
        this.currentCategory = 'national';
        this.currentLevelIndex = 0;
      } else {
        const categories = Object.keys(LEVELS_DB);
        const nextCategory = categories.find(cat => LEVELS_DB[cat].some(lvl => !this.completedLevels.has(lvl.id))) || categories[0];
        this.currentCategory = nextCategory;
        this.currentLevelIndex = Math.max(0, LEVELS_DB[nextCategory].findIndex(lvl => !this.completedLevels.has(lvl.id)));
      }
      // Подсвечиваем новую категорию в боковой панели
      document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === this.currentCategory);
      });
    }
    this.renderCategoryLevels();
    this.loadCurrentLevel();
  }

  launchConfetti() {
    const cCanvas = document.getElementById('confettiCanvas');
    const cCtx = cCanvas.getContext('2d');
    cCanvas.width = 440;
    cCanvas.height = 300;

    const particles = [];
    const colors = ['#F59E0B', '#0284C7', '#10B981', '#EF4444', '#EC4899', '#FDE047'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: cCanvas.width / 2,
        y: cCanvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // гравитация
        p.rot += p.vr;

        cCtx.save();
        cCtx.translate(p.x, p.y);
        cCtx.rotate((p.rot * Math.PI) / 180);
        cCtx.fillStyle = p.color;
        cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        cCtx.restore();
      });

      if (frame < 70) {
        requestAnimationFrame(animate);
      } else {
        cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
      }
    };
    animate();
  }

  // ------------------------------------------------------------------------
  // РЕЖИМ 3: ЕРКІН ШЫҒАРМАШЫЛЫҚ (СВОБОДНОЕ ТВОРЧЕСТВО)
  // ------------------------------------------------------------------------
  renderFreePresets() {
    const container = document.getElementById('presetsList');
    container.innerHTML = FREE_PRESETS.map((p, idx) => `
      <button class="preset-btn" data-idx="${idx}">
        <span>${this.currentLang === 'kk' ? p.nameKk : p.nameRu}</span>
      </button>
    `).join('');

    container.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx);
        this.loadFreePreset(idx);
      });
    });
  }

  loadFreePreset(idx) {
    const preset = FREE_PRESETS[idx];
    if (!preset) return;
    this.completedBands = JSON.parse(JSON.stringify(preset.bands));
    this.currentBand = [];
    this.sound.playFanfare();
    this.setMascotText(this.currentLang === 'kk'
      ? `«${preset.nameKk}» мысалы жүктелді! Өзгертіп, жалғастыра бер!`
      : `Пример «${preset.nameRu}» загружен! Можешь дополнять и менять!`);
    this.updateHUD();
    this.render();
  }

  // ------------------------------------------------------------------------
  // ЭКСПОРТ РИСУНКА В PNG С КАЗАХСКИМ ОРНАМЕНТАЛЬНЫМ ОБРАМЛЕНИЕМ
  // ------------------------------------------------------------------------
  openExportModal() {
    const exportModal = document.getElementById('exportModal');
    exportModal.style.display = 'flex';
    this.updateExportPreview();
  }

  updateExportPreview() {
    const finalCanvas = this.generateExportCanvas();
    const previewImg = document.getElementById('exportImgPreview');
    previewImg.src = finalCanvas.toDataURL('image/png');
  }

  generateExportCanvas() {
    const exportCanvas = document.createElement('canvas');
    const size = 900;
    exportCanvas.width = size;
    exportCanvas.height = size;
    const ctx = exportCanvas.getContext('2d');

    // 1. Градиентный фон с национальным казахским колоритом
    const bgGrad = ctx.createLinearGradient(0, 0, size, size);
    bgGrad.addColorStop(0, '#EFF6FF');
    bgGrad.addColorStop(0.5, '#F0FDF4');
    bgGrad.addColorStop(1, '#FEF3C7');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    // 2. Декоративная рамка с золотым кантом
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 14;
    ctx.strokeRect(15, 15, size - 30, size - 30);

    ctx.strokeStyle = '#00AFCA';
    ctx.lineWidth = 4;
    ctx.strokeRect(26, 26, size - 52, size - 52);

    // 3. Заголовок
    ctx.fillStyle = '#0284C7';
    ctx.font = "bold 32px 'Nunito', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText("ГЕОКОНТ | МЕНІҢ ТУЫНДЫМ (МОЕ ТВОРЧЕСТВО)", size / 2, 70);

    // 4. Отрисовка игрового поля по центру
    const boardSize = 640;
    ctx.drawImage(this.canvas, (size - boardSize) / 2, 95, boardSize, boardSize);

    // 5. Имя автора и конкурсная подпись
    const authorName = document.getElementById('childNameInput').value || "Жас шебер";
    ctx.fillStyle = '#0F172A';
    ctx.font = "bold 24px 'Nunito', sans-serif";
    const authorLine = `Авторы: ${authorName}`;
    ctx.fillText(authorLine, size / 2, 790);

    // Флаг рисуем сами: эмодзи флага на Windows выводится буквами KZ
    const flagX = size / 2 + ctx.measureText(authorLine).width / 2 + 12;
    ctx.fillStyle = '#00AFCA';
    ctx.fillRect(flagX, 770, 36, 24);
    ctx.fillStyle = '#FEC50C';
    ctx.fillRect(flagX + 2, 771, 3, 22);
    ctx.beginPath();
    ctx.arc(flagX + 20, 780, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#64748B';
    ctx.font = "16px 'Nunito', sans-serif";
    ctx.fillText("Республикалық балалар цифрлық жобалар конкурсы • Казахстан", size / 2, 825);

    // 6. Угловые казахские орнаменты «Қошқар мүйіз»
    this.drawCornerOrnament(ctx, 40, 40, 0);
    this.drawCornerOrnament(ctx, size - 40, 40, Math.PI / 2);
    this.drawCornerOrnament(ctx, size - 40, size - 40, Math.PI);
    this.drawCornerOrnament(ctx, 40, size - 40, -Math.PI / 2);

    return exportCanvas;
  }

  drawCornerOrnament(ctx, x, y, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(15, 15, 12, Math.PI, 0, false);
    ctx.arc(27, 27, 12, -Math.PI / 2, Math.PI / 2, false);
    ctx.stroke();
    ctx.restore();
  }

  downloadExportedPNG() {
    const finalCanvas = this.generateExportCanvas();
    const link = document.createElement('a');
    link.download = `Geokont_Tvorchestvo_${Date.now()}.png`;
    link.href = finalCanvas.toDataURL('image/png');
    link.click();
    document.getElementById('exportModal').style.display = 'none';
    this.sound.playFanfare();
  }

  // ------------------------------------------------------------------------
  // ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ И ЯЗЫКОВ
  // ------------------------------------------------------------------------
  switchMode(mode) {
    if (mode === this.currentMode) return;

    // Сохраняем резинки текущего режима и возвращаем сохраненные резинки нового
    this.savedBoards[this.currentMode] = { completedBands: this.completedBands, currentBand: this.currentBand };
    const savedBoard = this.savedBoards[mode];
    this.completedBands = savedBoard ? savedBoard.completedBands : [];
    this.currentBand = savedBoard ? savedBoard.currentBand : [];
    this.isDragging = false;
    this.dragPointer = null;

    this.currentMode = mode;
    this.sound.playPluck(400);

    // Подсветка из режима обучения не должна «переезжать» в задания и творчество
    clearTimeout(this.hintTimer);
    this.hintHighlightedPeg = null;
    this.highlightRays = false;

    // Обновление табов
    document.querySelectorAll('.nav-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });

    // Панели сайдбара
    document.getElementById('panelLearn').style.display = mode === 'learn' ? 'flex' : 'none';
    document.getElementById('panelTasks').style.display = mode === 'tasks' ? 'flex' : 'none';
    document.getElementById('panelFree').style.display = mode === 'free' ? 'flex' : 'none';

    if (mode === 'learn') {
      this.applyStoryStep(this.storyStep);
    } else if (mode === 'tasks') {
      this.loadCurrentLevel(Boolean(savedBoard));
    } else if (mode === 'free') {
      this.setMascotText(this.t('mascotFreeMode'));
    }

    this.updateHUD();
    this.render();
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    this.sound.playSnap();

    document.getElementById('btnLangKz').classList.toggle('active', lang === 'kk');
    document.getElementById('btnLangRu').classList.toggle('active', lang === 'ru');

    this.updateLanguageUI();
  }

  updateLanguageUI() {
    const dict = I18N[this.currentLang];
    document.documentElement.lang = this.currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    this.initLearnStoryStepper();
    this.renderFreePresets();

    this.renderRayLegend();

    if (this.currentMode === 'tasks') {
      this.renderCategoryLevels();
      this.loadCurrentLevel(true);
    } else if (this.currentMode === 'learn') {
      this.setMascotText(this.getStoryStepText(this.storyStep));
    } else {
      this.setMascotText(this.t('mascotFreeMode'));
    }

    this.updateHUD();
  }

  t(key) {
    return I18N[this.currentLang][key] || key;
  }

  // Подписи легенды лучей на текущем языке (раньше часть была только по-русски)
  renderRayLegend() {
    document.querySelectorAll('.ray-chip').forEach(chip => {
      const rayDef = RAYS_DEF.find(r => r.id === chip.dataset.ray);
      if (rayDef) {
        chip.textContent = `${rayDef.id} (${this.currentLang === 'kk' ? rayDef.nameKk : rayDef.nameRu})`;
      }
    });
  }

  // Подсветка выбранного цвета в палитре совпадает с activeColor
  syncPaletteUI() {
    document.querySelectorAll('.color-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.color === this.activeColor);
    });
  }

  setMascotText(txt) {
    const el = document.getElementById('mascotSpeechText');
    if (el) {
      el.textContent = txt;
      // Анимация подпрыгивания Барсенка
      const avatar = document.querySelector('.mascot-avatar-wrap');
      if (avatar) {
        avatar.style.transform = 'scale(1.12) rotate(-4deg)';
        setTimeout(() => { avatar.style.transform = ''; }, 300);
      }
    }
  }

  // Озвучивание речи через Web Speech API
  speakText(text) {
    if (!('speechSynthesis' in window)) {
      this.sound.playPluck(500);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.currentLang === 'kk' ? 'kk-KZ' : 'ru-RU';

    // Казахский голос установлен редко: без него браузер молчит, поэтому читаем русским голосом
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = this.currentLang === 'kk' ? 'kk' : 'ru';
    const voice = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix))
      || voices.find(v => v.lang.toLowerCase().startsWith('ru'));
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = 0.95; // Чуть медленнее для детского восприятия
    utterance.pitch = 1.25; // Более детский дружелюбный тон

    window.speechSynthesis.speak(utterance);
    this.sound.playPluck(480);
  }
}

// Запуск игры после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  window.geokontGame = new GeokontGame();
});
