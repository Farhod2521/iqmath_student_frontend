// Foydalanuvchilar oylik hisoboti — Word (.docx), brauzerda yaratiladi (docx kutubxonasi).
// Ma'lumot: GET /api/v1/auth/student/monthly-report/?year&month  (users — to'liq ro'yxat)
// Uslub: minimalistik — oq fon, ingichka gorizontal chiziqlar, rangli matn, har rol alohida jadvalda.

const FONT = 'Segoe UI'
const NBSP = ' '
const C = {
  ink: '0F172A',
  text: '1E293B',
  muted: '64748B',
  subtle: '94A3B8',
  line: 'E2E8F0',
  headFill: 'F1F5F9',
  cardFill: 'F8FAFC',
  white: 'FFFFFF',
  blue: '2563EB',
  green: '16A34A',
  red: 'DC2626',
  orange: 'EA580C',
  gray: '94A3B8'
}

export const REPORT_MONTHS = {
  uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
}

// Bo'limlar tartibi va rangi (sahifadagi kartalar bilan bir xil)
const ROLES = [
  { key: 'student', color: '2563EB' },
  { key: 'parent', color: 'DB2777' },
  { key: 'tutor', color: '7C3AED' },
  { key: 'teacher', color: 'EA580C' }
]

const TEXTS = {
  uz: {
    brand: 'Foydalanuvchilar hisoboti',
    title: 'Oylik hisobot',
    subtitle: "{month} oyida ro'yxatdan o'tganlar",
    generated: 'Tayyorlangan',
    totalNew: 'Jami yangi',
    prev: "o'tgan oy",
    newBadge: 'yangi',
    count: '{count} ta',
    sectionCount: '{count} ta foydalanuvchi',
    no: '№',
    name: 'F.I.Sh.',
    className: 'Sinf',
    subject: 'Fan',
    status: 'Holati',
    diagnostic: 'Diagnostika',
    daily: 'Kunlik vazifa',
    subscription: 'Obuna',
    phone: 'Telefon',
    lang: 'Til',
    device: 'Qurilma',
    lastLogin: 'Oxirgi kirish',
    registered: "Ro'yxatdan o'tgan",
    active: 'Faol',
    inactive: 'Faol emas',
    submitted: 'Topshirdi',
    notSubmitted: 'Topshirmadi',
    yes: 'Ha',
    no_: "Yo'q",
    daysLeft: '{days} kun qoldi',
    classSuffix: 'sinf',
    empty: "Bu oyda ro'yxatdan o'tgan foydalanuvchi yo'q.",
    page: 'Sahifa',
    roles: { student: "O'quvchilar", parent: 'Ota-onalar', tutor: "O'qituvchilar", teacher: 'Mentorlar' },
    sales: 'Sotuvlar',
    buyers: 'Sotib olganlar',
    revenue: 'Tushum',
    payments: "To'lovlar",
    som: "so'm",
    newBought: 'Yangilardan sotib olgan',
    newNotBought: 'Yangilardan sotib olmagan',
    ofNew: "{total} ta yangi o'quvchidan",
    tariff: 'Tarif',
    period: 'Muddat',
    countCol: 'Soni',
    months: '{n} oylik',
    otherTariff: 'Boshqa',
    noSales: "Bu oyda to'lov bo'lmagan.",
    fileName: 'IQMath_hisobot'
  },
  ru: {
    brand: 'Отчёт по пользователям',
    title: 'Ежемесячный отчёт',
    subtitle: 'Зарегистрированные в {month}',
    generated: 'Сформирован',
    totalNew: 'Всего новых',
    prev: 'прошлый месяц',
    newBadge: 'новое',
    count: '{count}',
    sectionCount: 'пользователей: {count}',
    no: '№',
    name: 'Ф.И.О.',
    className: 'Класс',
    subject: 'Предмет',
    status: 'Статус',
    diagnostic: 'Диагностика',
    daily: 'Ежедн. задание',
    subscription: 'Подписка',
    phone: 'Телефон',
    lang: 'Язык',
    device: 'Устройство',
    lastLogin: 'Последний вход',
    registered: 'Регистрация',
    active: 'Активен',
    inactive: 'Неактивен',
    submitted: 'Сдал',
    notSubmitted: 'Не сдал',
    yes: 'Да',
    no_: 'Нет',
    daysLeft: 'осталось {days} дн.',
    classSuffix: 'класс',
    empty: 'В этом месяце новых пользователей нет.',
    page: 'Страница',
    roles: { student: 'Ученики', parent: 'Родители', tutor: 'Учителя', teacher: 'Менторы' },
    sales: 'Продажи',
    buyers: 'Купили',
    revenue: 'Выручка',
    payments: 'Платежи',
    som: 'сум',
    newBought: 'Купили из новых',
    newNotBought: 'Не купили из новых',
    ofNew: 'из {total} новых учеников',
    tariff: 'Тариф',
    period: 'Срок',
    countCol: 'Кол-во',
    months: '{n} мес.',
    otherTariff: 'Другое',
    noSales: 'В этом месяце платежей не было.',
    fileName: 'IQMath_otchet'
  }
}

const fill = (text, args = {}) => Object.entries(args).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), text)
const num = (value) => Number(value || 0).toLocaleString('ru-RU')
const keep = (text) => String(text ?? '').replaceAll(' ', NBSP) // qatorga bo'linmasin

/** "998901234567" → "+998 90 123 45 67" (bo'linmaydigan bo'shliqlar bilan) */
const formatPhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('998')) {
    return keep(`+998 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`)
  }
  return value || '—'
}

const changeOf = (cur, prev) => {
  if (!prev) return cur ? { dir: 'new' } : { dir: 'same', pct: 0 }
  const pct = Math.round(((cur - prev) * 100) / prev)
  return { pct: Math.abs(pct), dir: pct > 0 ? 'up' : pct < 0 ? 'down' : 'same' }
}

/**
 * Hisobotni yaratib, .docx faylni yuklab beradi.
 * @param {object} data — monthly-report API javobi
 * @param {'uz'|'ru'} lang
 */
export async function downloadMonthlyReportDocx(data, lang = 'uz') {
  const {
    AlignmentType,
    BorderStyle,
    Document,
    Footer,
    Packer,
    PageNumber,
    PageOrientation,
    Paragraph,
    ShadingType,
    Table,
    TableCell,
    TableRow,
    TextRun,
    VerticalAlign,
    WidthType
  } = await import('docx')

  const t = TEXTS[lang] || TEXTS.uz
  const months = REPORT_MONTHS[lang] || REPORT_MONTHS.uz
  const monthName = months[data.period.month - 1]
  const prevName = months[data.previous_period.month - 1]
  const periodLabel = `${monthName} ${data.period.year}`

  // Albom A4: 16838 - 2 × 680 (1,2 sm hoshiya) = 15478
  const PAGE_WIDTH = 15478

  // noProof — Word o'zbekcha matnni imlo xatosi deb qizil chiziq bilan belgilamasin
  const run = (text, opts = {}) =>
    new TextRun({ text: String(text ?? ''), font: FONT, size: 18, color: C.text, noProof: true, ...opts })

  const none = { style: BorderStyle.NONE, size: 0, color: C.white }
  const hairline = { style: BorderStyle.SINGLE, size: 4, color: C.line }

  const para = (children, opts = {}) =>
    new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts })

  // ───────────── Sarlavha ─────────────
  const header = [
    para(
      [
        run('iQ', { bold: true, color: C.blue, size: 22 }),
        run(` MATH  ·  ${t.brand}`, { bold: true, color: C.muted, size: 18 })
      ],
      {
        spacing: { after: 160 }
      }
    ),
    para(run(periodLabel, { bold: true, color: C.ink, size: 52 }), { spacing: { after: 40 } }),
    para(
      [
        run(fill(t.subtitle, { month: periodLabel }), { color: C.muted, size: 20 }),
        run(`   ·   ${t.generated}: ${data.generated_at}`, { color: C.subtle, size: 18 })
      ],
      {
        spacing: { after: 280 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.line, space: 10 } }
      }
    )
  ]

  // ───────────── Asosiy ko'rsatkichlar (kartalar) ─────────────
  const kpiItems = [
    { label: t.totalNew, value: data.total_current, prev: data.total_previous, color: C.ink },
    ...ROLES.map((role) => ({
      label: t.roles[role.key],
      value: data.current?.[role.key],
      prev: data.previous?.[role.key],
      color: role.color
    }))
  ]
  // Oq qalin chegaralar kartalar orasida bo'shliq hosil qiladi
  const gap = { style: BorderStyle.SINGLE, size: 36, color: C.white }

  const buildKpiTable = (kpiItems) => {
    const kpiWidth = Math.floor(PAGE_WIDTH / kpiItems.length)
    const kpiWidths = kpiItems.map((_, i) =>
      i === kpiItems.length - 1 ? PAGE_WIDTH - kpiWidth * (kpiItems.length - 1) : kpiWidth
    )
    return new Table({
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      columnWidths: kpiWidths,
      rows: [
        new TableRow({
          children: kpiItems.map((item, index) => {
            const change = changeOf(item.value || 0, item.prev || 0)
            const changeText =
              change.dir === 'new'
                ? `▲ ${t.newBadge}`
                : change.dir === 'same'
                  ? '— 0%'
                  : `${change.dir === 'up' ? '▲' : '▼'} ${change.pct}%`
            const changeColor = change.dir === 'down' ? C.red : change.dir === 'same' ? C.subtle : C.green
            const footer =
              item.note !== undefined
                ? [run(item.note, { color: C.subtle, size: 16 })]
                : [
                    run(changeText, { bold: true, color: changeColor, size: 16 }),
                    run(`   ${prevName.toLowerCase()}: ${item.format ? item.format(item.prev) : num(item.prev)}`, {
                      color: C.subtle,
                      size: 16
                    })
                  ]
            return new TableCell({
              width: { size: kpiWidths[index], type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.cardFill },
              borders: {
                top: gap,
                bottom: gap,
                left: index === 0 ? none : gap,
                right: index === kpiItems.length - 1 ? none : gap
              },
              margins: { top: 160, bottom: 160, left: 220, right: 160 },
              children: [
                para([run('■ ', { color: item.color, size: 14 }), run(item.label, { color: C.muted, size: 17 })], {
                  spacing: { after: 60 }
                }),
                para(
                  run(item.format ? item.format(item.value) : num(item.value), {
                    bold: true,
                    color: C.ink,
                    size: item.format ? 32 : 40
                  }),
                  {
                    spacing: { after: 40 }
                  }
                ),
                para(footer)
              ]
            })
          })
        })
      ]
    })
  }

  const kpiTable = buildKpiTable(kpiItems)

  // ───────────── Sotuvlar ─────────────
  const sales = data.sales
  const somFmt = (value) => `${num(Math.round(Number(value) || 0))} ${t.som}`
  // headCell/bodyCell pastda e'lon qilinadi — blok hujjat yig'ilayotganda (keyin) quriladi
  const buildSalesBlock = () => {
    const salesBlock = []
    if (sales) {
      const newTotal = sales.new_students || 0
      const pct = (value) => (newTotal ? Math.round(((value || 0) * 100) / newTotal) : 0)
      salesBlock.push(
        para([run('■  ', { color: C.green, size: 22 }), run(t.sales, { bold: true, color: C.ink, size: 28 })], {
          spacing: { before: 420, after: 160 },
          keepNext: true
        }),
        buildKpiTable([
          { label: t.buyers, value: sales.buyers, prev: sales.previous?.buyers, color: C.green },
          { label: t.revenue, value: sales.revenue, prev: sales.previous?.revenue, color: C.blue, format: somFmt },
          { label: t.payments, value: sales.payments, prev: sales.previous?.payments, color: '7C3AED' },
          {
            label: t.newBought,
            value: sales.new_bought,
            color: C.green,
            note: `${pct(sales.new_bought)}% · ${fill(t.ofNew, { total: num(newTotal) })}`
          },
          {
            label: t.newNotBought,
            value: sales.new_not_bought,
            color: C.red,
            note: `${pct(sales.new_not_bought)}% · ${fill(t.ofNew, { total: num(newTotal) })}`
          }
        ])
      )
      const rows = sales.by_tariff || []
      if (rows.length) {
        const widths = [6000, 3000, 2400, PAGE_WIDTH - 11400]
        salesBlock.push(
          para(run(''), { spacing: { after: 120 } }),
          new Table({
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            columnWidths: widths,
            borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
            rows: [
              new TableRow({
                tableHeader: true,
                children: [
                  headCell(t.tariff, widths[0], AlignmentType.LEFT),
                  headCell(t.period, widths[1], AlignmentType.LEFT),
                  headCell(t.countCol, widths[2], AlignmentType.CENTER),
                  headCell(t.revenue, widths[3], AlignmentType.RIGHT)
                ]
              }),
              ...rows.map(
                (row) =>
                  new TableRow({
                    cantSplit: true,
                    children: [
                      bodyCell(
                        widths[0],
                        AlignmentType.LEFT,
                        run((lang === 'ru' ? row.name_ru : row.name_uz) || t.otherTariff, { bold: true, color: C.ink })
                      ),
                      bodyCell(
                        widths[1],
                        AlignmentType.LEFT,
                        run(fill(t.months, { n: row.months }), { color: C.muted })
                      ),
                      bodyCell(widths[2], AlignmentType.CENTER, run(num(row.count), { bold: true, color: C.blue })),
                      bodyCell(
                        widths[3],
                        AlignmentType.RIGHT,
                        run(keep(somFmt(row.revenue)), { bold: true, color: C.ink })
                      )
                    ]
                  })
              )
            ]
          })
        )
      } else {
        salesBlock.push(para(run(t.noSales, { color: C.subtle, italics: true }), { spacing: { before: 160 } }))
      }
    }
    return salesBlock
  }

  // ───────────── Jadvallar ─────────────
  const headCell = (text, width, align) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.headFill },
      borders: { top: none, left: none, right: none, bottom: none },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 90, bottom: 90, left: 90, right: 90 },
      children: [para(run(text, { bold: true, color: C.muted, size: 16 }), { alignment: align })]
    })

  const bodyCell = (width, align, children) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      borders: { top: none, left: none, right: none, bottom: hairline },
      verticalAlign: VerticalAlign.CENTER,
      margins: { top: 90, bottom: 90, left: 90, right: 90 },
      children: (Array.isArray(children) ? children : [children]).map((child) =>
        child instanceof Paragraph ? child : para(child, { alignment: align })
      )
    })

  const dashRun = () => run('—', { color: C.subtle })

  // Har bir ustun: sarlavha, kenglik, tekislash va qiymat (TextRun yoki Paragraph'lar)
  const columnDefs = {
    no: {
      title: t.no,
      width: 460,
      align: AlignmentType.CENTER,
      render: (_, i) => run(i + 1, { color: C.subtle, size: 16 })
    },
    name: { title: t.name, render: (u) => run(u.full_name || '—', { bold: true, color: C.ink }) },
    className: {
      title: t.className,
      align: AlignmentType.CENTER,
      render: (u) => {
        const n = String(u.class_num || '').split(' ')[0]
        // U+2011 — bo'linmaydigan defis: "11-sinf" ikki qatorga bo'linib ketmasin
        return n ? run(keep(`${n}‑${t.classSuffix}`)) : dashRun()
      }
    },
    subject: {
      title: t.subject,
      render: (u) => {
        const value = (lang === 'ru' ? u.subject_name_ru : u.subject_name_uz) || u.subject_name_uz
        return value ? run(value) : dashRun()
      }
    },
    status: {
      title: t.status,
      render: (u) =>
        run(keep(`● ${u.status ? t.active : t.inactive}`), { bold: true, color: u.status ? C.green : C.gray, size: 17 })
    },
    diagnostic: {
      title: t.diagnostic,
      render: (u) =>
        run(u.has_diagnost ? t.submitted : t.notSubmitted, {
          bold: true,
          color: u.has_diagnost ? C.blue : C.red,
          size: 17
        })
    },
    daily: {
      title: t.daily,
      align: AlignmentType.CENTER,
      render: (u) =>
        run(u.completed_today ? t.yes : t.no_, { bold: true, color: u.completed_today ? C.green : C.orange, size: 17 })
    },
    subscription: {
      title: t.subscription,
      render: (u) => {
        if (!u.subscription_end_date) return dashRun()
        const days = Number(u.remaining_days ?? 0)
        return [
          para(run(String(u.subscription_end_date).replaceAll('/', '.'), { bold: true, color: C.ink, size: 17 })),
          para(run(keep(fill(t.daysLeft, { days })), { color: days <= 3 ? C.red : C.subtle, size: 15 }))
        ]
      }
    },
    phone: { title: t.phone, render: (u) => run(formatPhone(u.phone)) },
    lang: {
      title: t.lang,
      align: AlignmentType.CENTER,
      render: (u) => (u.lang ? run(u.lang, { bold: true, color: C.muted, size: 16 }) : dashRun())
    },
    device: {
      title: t.device,
      render: (u) => (u.device ? run(String(u.device).replaceAll('-', '.'), { color: C.muted }) : dashRun())
    },
    lastLogin: {
      title: t.lastLogin,
      render: (u) =>
        u.last_login_time
          ? run(keep(String(u.last_login_time).replaceAll('/', '.')), { color: C.muted, size: 17 })
          : dashRun()
    },
    registered: { title: t.registered, render: (u) => run(keep(u.date || '—'), { color: C.muted, size: 17 }) }
  }

  // O'quvchilar uchun to'liq ustunlar, qolgan rollar uchun — faqat umumiylari
  const LAYOUTS = {
    student: {
      cols: [
        'no',
        'name',
        'className',
        'subject',
        'status',
        'diagnostic',
        'daily',
        'subscription',
        'phone',
        'lang',
        'device',
        'lastLogin',
        'registered'
      ],
      widths: [460, 2420, 940, 1150, 1100, 1220, 980, 1400, 1780, 560, 1000, 1220, 1248]
    },
    other: {
      cols: ['no', 'name', 'status', 'phone', 'lang', 'device', 'lastLogin', 'registered'],
      widths: [520, 4300, 1500, 2300, 900, 1800, 2058, 2100]
    }
  }

  const roleTable = (roleKey, list) => {
    const layout = roleKey === 'student' ? LAYOUTS.student : LAYOUTS.other
    const cols = layout.cols.map((key, i) => ({ ...columnDefs[key], width: layout.widths[i], key }))
    return new Table({
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      columnWidths: layout.widths,
      borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
      rows: [
        new TableRow({
          tableHeader: true, // har sahifada takrorlanadi
          children: cols.map((col) => headCell(col.title, col.width, col.align || AlignmentType.LEFT))
        }),
        ...list.map(
          (user, index) =>
            new TableRow({
              cantSplit: true,
              children: cols.map((col) => bodyCell(col.width, col.align || AlignmentType.LEFT, col.render(user, index)))
            })
        )
      ]
    })
  }

  const users = data.users || []
  const sections = []
  ROLES.forEach((role) => {
    const list = users.filter((user) => user.role === role.key)
    if (!list.length) return
    sections.push(
      para(
        [
          run('■  ', { color: role.color, size: 22 }),
          run(t.roles[role.key], { bold: true, color: C.ink, size: 28 }),
          run(`   ${fill(t.sectionCount, { count: num(list.length) })}`, { color: C.subtle, size: 18 })
        ],
        { spacing: { before: 420, after: 160 }, keepNext: true }
      ),
      roleTable(role.key, list)
    )
  })
  if (!sections.length) {
    sections.push(para(run(t.empty, { color: C.subtle, italics: true }), { spacing: { before: 400 } }))
  }

  const doc = new Document({
    creator: 'IQMath',
    title: `${t.brand} — ${periodLabel}`,
    styles: { default: { document: { run: { font: FONT, size: 18 } } } },
    sections: [
      {
        properties: {
          page: {
            // A4 albom (docx o'lchamni portret ko'rinishida qabul qiladi)
            size: { width: 11906, height: 16838, orientation: PageOrientation.LANDSCAPE },
            margin: { top: 680, bottom: 680, left: 680, right: 680 }
          }
        },
        footers: {
          default: new Footer({
            children: [
              para(
                [
                  run(`IQMath  ·  ${t.brand}  ·  ${periodLabel}`, { color: C.subtle, size: 15 }),
                  run(`        ${t.page} `, { color: C.subtle, size: 15 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: C.subtle })
                ],
                { alignment: AlignmentType.RIGHT }
              )
            ]
          })
        },
        children: [...header, kpiTable, ...buildSalesBlock(), ...sections]
      }
    ]
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${t.fileName}_${data.period.year}_${String(data.period.month).padStart(2, '0')}.docx`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
