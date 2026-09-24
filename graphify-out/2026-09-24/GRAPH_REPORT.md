# Graph Report - iqmath_student  (2026-09-24)

## Corpus Check
- Large corpus: 1031 files · ~3,249,060 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 2618 nodes · 8130 edges · 165 communities (86 shown, 79 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Pages - [id]
- Hooks - Api
- Mathjax
- Cupons module
- Package
- Teacher - Statistics
- Layout - Navbar
- Student - Utils
- Home - Faq
- Chat Box - Components
- Student - Exam
- Mathjax
- Components - Shared
- Parent - Home
- Student - Battle
- Components - Topic
- Mathjax
- Parent - Profile
- Student - Products
- Mathjax
- Mathjax
- Mathjax
- Tutor - Groups
- Home - Auth
- Student - Tabs
- Mathjax
- Home - Defend Focus
- Home - Defend Focus
- Home - Auth
- Parent - Children
- Mathjax
- Student - Home
- Pages - My Study
- Pages - Games
- Home - Header
- Layout - Sidebar
- Mathjax
- Home - Games
- Student - Payment
- Mathjax
- Mathjax
- Home - Reviews
- Mathjax
- Dummy Data
- Home - Exceptional Feature
- Pages - Tasks
- Pages - [id]
- Components - Promo
- Mathjax
- Layout - Math Modal
- Components - Icons
- Teacher - Detail
- Mathjax
- Home - Theme
- Teacher - Kpi
- Student - Chat
- Mathjax
- Mathjax
- Mathjax
- Layout - Libs
- Components - Drag And Drop
- Components - Dashboard Nav
- Tutor - Profile
- Mathjax
- Store
- Pages - Ratings
- Mathjax
- Home - Form
- Home - Pricing
- Components - Uzbekistan Map
- Mathjax
- Components - Dashboard
- Home - Footer
- Home - Features
- Student - Utils
- Teacher - Student Examples
- Pages - subscriptionPlans
- Eslint.config
- Student - Panel
- Constants
- Constants
- Mathjax
- Mathjax
- Library - Modal
- Student - Home
- Tutor - Home
- Services - I18n
- Home - Process
- Tutor - Profile
- Components - Topic
- Library - Components
- Tutor - Profile
- Pages - Components
- Package
- Package
- Mathjax
- Student - Payment
- Home - Defend Focus
- Teacher - Student Examples
- Pages - Games
- Mathjax
- Tutor - Groups
- Tutor - Home
- Tutor - Home
- Jsconfig
- Next.config
- Teacher - Subjects
- Tutor - Home
- Student - Battle
- Src
- Parent - Profile
- Parent - Profile
- Data
- Data
- Data

## God Nodes (most connected - your core abstractions)
1. `react` - 384 edges
2. `react-i18next` - 333 edges
3. `next` - 170 edges
4. `useGetQuery()` - 153 edges
5. `a()` - 142 edges
6. `T()` - 107 edges
7. `i()` - 104 edges
8. `lucide-react` - 101 edges
9. `URLS` - 95 edges
10. `Q()` - 91 edges

## Surprising Connections (you probably didn't know these)
- `ChildDetail()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/modules/parent/children/pages/ChildDetail.jsx → src/hooks/api/useGetQuery.js
- `Index()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/parent/results/[id]/index.jsx → src/hooks/api/useGetQuery.js
- `SubjectsPage()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/student/recommendations/[id]/index.js → src/hooks/api/useGetQuery.js
- `SubjectsPage()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/student/subjects/[id]/index.js → src/hooks/api/useGetQuery.js
- `DashboardNav()` --calls--> `useRoleDetection()`  [EXTRACTED]
  src/components/dashboard/dashboard-nav/index.jsx → src/hooks/useRoleDetection.js

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (165 total, 79 thin omitted)

### Community 0 - "Pages - [id]"
Cohesion: 0.05
Nodes (22): react-i18next, src_assets_images_backgrounds_subject_bacground, HeaderTitle(), SearchInput(), SelectBox(), Individual(), LayoutAdmin(), MyChildren() (+14 more)

### Community 1 - "Hooks - Api"
Cohesion: 0.07
Nodes (33): react-hot-toast, src_assets_images_mentor_background, BaseBreadcrumbs(), CloseIcon(), EditIcon(), QuestionCountIcon(), VideoPlayer(), KEYS (+25 more)

### Community 3 - "Cupons module"
Cohesion: 0.04
Nodes (54): ref_constants, @heroicons/react, Header(), UserAgreement(), ProfileDetails(), TopicDropdown(), NewsSingle(), useDeleteQuery() (+46 more)

### Community 4 - "Package"
Cohesion: 0.03
Nodes (74): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+66 more)

### Community 5 - "Teacher - Statistics"
Cohesion: 0.03
Nodes (17): EyeIcon(), echarts-for-react, react, ref_react_router, RoomContext, TopicContext, days, heatmapData (+9 more)

### Community 6 - "Layout - Navbar"
Cohesion: 0.07
Nodes (37): ref, ag-grid-community, ag-grid-react, next-auth, ContentLoader(), useRoleDetection(), Navbar(), NavbarBackTeacher() (+29 more)

### Community 7 - "Student - Utils"
Cohesion: 0.06
Nodes (34): brainly-style-guide, react-mathquill, LanguageDropdown(), languages, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols (+26 more)

### Community 8 - "Home - Faq"
Cohesion: 0.07
Nodes (30): src_assets_images_about_iqmath, src_assets_images_about_iqmath_banner_4k, Footer(), Banner(), FEATURES, KeyMetric(), AuthLanding(), BannerFaq() (+22 more)

### Community 9 - "Chat Box - Components"
Cohesion: 0.06
Nodes (28): ChatBoxModule(), ChatHeader(), ChatsList(), formatDate(), CloseModal(), EmptyMessage(), IndependentResultCard(), MessageBubble() (+20 more)

### Community 10 - "Student - Exam"
Cohesion: 0.11
Nodes (22): better-react-mathjax, @heroui/react, html-react-parser, SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), useGetPlans(), ActionCalculator() (+14 more)

### Community 12 - "Components - Shared"
Cohesion: 0.06
Nodes (8): @mui/material, ref_prop_types, src_assets_images_frontend_pages_icons_icon_check, src_assets_images_frontend_pages_icons_icon_close, BaseCard(), keys, Licenses, BannerGames()

### Community 13 - "Parent - Home"
Cohesion: 0.06
Nodes (19): src_assets_parent_background, SelectClass(), BannerHeader(), NewsAll(), newsApi, AddChildModal(), AVATAR_COLORS, ParentChildrenCard() (+11 more)

### Community 14 - "Student - Battle"
Cohesion: 0.08
Nodes (24): recharts, BattleArena(), BattleChat(), BattleLevelBadge(), LEVEL_COLORS, AVATAR_COLORS, BattlePlayerAvatar(), getColor() (+16 more)

### Community 15 - "Components - Topic"
Cohesion: 0.05
Nodes (42): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, axios, @ckeditor/ckeditor5-build-classic (+34 more)

### Community 16 - "Mathjax"
Cohesion: 0.07
Nodes (3): s(), visit(), x()

### Community 17 - "Parent - Profile"
Cohesion: 0.13
Nodes (11): next, RightIcon(), TrashIcon(), ImageUploader(), Input(), AnimateUp(), ParentChangePasswordModal(), ParentEditInfoModal() (+3 more)

### Community 18 - "Student - Products"
Cohesion: 0.07
Nodes (23): dayjs, usePurchasedProducts(), EmptyState(), ErrorState(), src_modules_student_products_components_index_emptystate, src_modules_student_products_components_index_errorstate, src_modules_student_products_components_index_productgrid, LoadingState() (+15 more)

### Community 20 - "Mathjax"
Cohesion: 0.07
Nodes (14): annotate(), applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_() (+6 more)

### Community 22 - "Tutor - Groups"
Cohesion: 0.15
Nodes (18): lucide-react, ProgressChart(), AddStudentsModal(), ConfirmModal(), GroupFormModal(), GroupStudentsTable(), InviteStudentModal(), Modal() (+10 more)

### Community 23 - "Home - Auth"
Cohesion: 0.16
Nodes (19): react-hook-form, InputPassword, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone, InputText, SelectRole() (+11 more)

### Community 24 - "Student - Tabs"
Cohesion: 0.12
Nodes (18): NavbarCoins(), NavbarPoints(), NavbarSum(), CoinConvert(), RATES, Products(), StudentProfile(), CoinsHistoryTab() (+10 more)

### Community 26 - "Home - Defend Focus"
Cohesion: 0.08
Nodes (15): @tanstack/react-query, src_assets_styles_globals, reactQueryClient, UserProfileContext, UserProfileProvider(), NEWS, newsApi, newsApi (+7 more)

### Community 27 - "Home - Defend Focus"
Cohesion: 0.08
Nodes (13): ref_react_syntax_highlighter, @tabler/icons, src_assets_images_frontend_pages_homepage_accordian1, src_assets_images_frontend_pages_homepage_notification_left, src_assets_images_frontend_pages_homepage_notification_right, src_assets_images_frontend_pages_homepage_notification_top_right, StyledAccordian, StyledAccordian (+5 more)

### Community 28 - "Home - Auth"
Cohesion: 0.18
Nodes (16): @mui/icons-material, src_data_gamesdata_mentalgames, safekidSeeds, Auth(), closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection() (+8 more)

### Community 29 - "Parent - Children"
Cohesion: 0.13
Nodes (9): react-icons, Button(), MultiplicationModal(), numbers, NoActivityState(), ConfirmPurchaseModal(), PurchaseSuccessModal(), AutoCompleteSelect() (+1 more)

### Community 30 - "Mathjax"
Cohesion: 0.20
Nodes (4): getFactory(), makeBranchNode(), makeEmptyNode(), parseList()

### Community 31 - "Student - Home"
Cohesion: 0.13
Nodes (16): lodash, buildMonthGrid(), formatDDMMYYYY(), HomeCalendarCard(), MONTH_LABELS_UZ, WEEKDAYS_UZ, HomeHero(), HomeRecentActivity() (+8 more)

### Community 32 - "Pages - My Study"
Cohesion: 0.14
Nodes (13): react-paginate, EmptyPage(), ButtonCellRenderer(), GridExample(), Pagination(), MyStudyAcitve(), NavbarStudy(), StudentExamplePagination() (+5 more)

### Community 33 - "Pages - Games"
Cohesion: 0.08
Nodes (23): src_assets_images_mental_games_animalcrush, src_assets_images_mental_games_colormemory, src_assets_images_mental_games_connector, src_assets_images_mental_games_findifference, src_assets_images_mental_games_fishingfrenzy, src_assets_images_mental_games_halloweenword, src_assets_images_mental_games_happyhellowen, src_assets_images_mental_games_impossible (+15 more)

### Community 34 - "Home - Header"
Cohesion: 0.13
Nodes (15): Brand(), navLinks, InstagramIcon(), PhoneIcon(), TelegramIcon(), YoutubeIcon(), AppBarStyled, defaultLinks (+7 more)

### Community 35 - "Layout - Sidebar"
Cohesion: 0.15
Nodes (16): Main(), MainWrapper(), NavbarTitle(), Sidebar(), SidebarFooter(), SidebarLogo(), SidebarPlan(), CardLockedSubject() (+8 more)

### Community 37 - "Home - Games"
Cohesion: 0.13
Nodes (15): BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle(), values (+7 more)

### Community 38 - "Student - Payment"
Cohesion: 0.16
Nodes (13): CouponModal(), CouponSection(), src_modules_student_payment_components_index_couponsection, src_modules_student_payment_components_index_modalheader, src_modules_student_payment_components_index_plangrid, ModalHeader(), PlanCard(), PlanGrid() (+5 more)

### Community 42 - "Home - Reviews"
Cohesion: 0.10
Nodes (14): react-slick, slick-carousel, src_assets_images_landingpage_apps_app_chat, src_assets_images_landingpage_apps_app_email, src_assets_images_landingpage_demos_demo_dark, src_assets_images_landingpage_demos_demo_horizontal, src_assets_images_landingpage_demos_demo_main, src_assets_images_landingpage_demos_demo_rtl (+6 more)

### Community 44 - "Dummy Data"
Cohesion: 0.15
Nodes (12): framer-motion, SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions, topics (+4 more)

### Community 45 - "Home - Exceptional Feature"
Cohesion: 0.10
Nodes (19): src_assets_images_frontend_pages_icons_icon_chart, src_assets_images_frontend_pages_icons_icon_color, src_assets_images_frontend_pages_icons_icon_components, src_assets_images_frontend_pages_icons_icon_customize, src_assets_images_frontend_pages_icons_icon_framework, src_assets_images_frontend_pages_icons_icon_icons, src_assets_images_frontend_pages_icons_icon_pages, src_assets_images_frontend_pages_icons_icon_responsive (+11 more)

### Community 46 - "Pages - Tasks"
Cohesion: 0.20
Nodes (16): Eye(), buildApiParams(), DailyTasksPage(), formatScore(), getCurrentWeek(), getDaysInRange(), getLocalizedName(), getQueryValue() (+8 more)

### Community 47 - "Pages - [id]"
Cohesion: 0.15
Nodes (7): InfoCircleIcon(), MotivationCard(), ProgressMeter(), SubjectBreadcrumbs(), SubjectHeader(), SubjectsPage(), SubjectsPage()

### Community 48 - "Components - Promo"
Cohesion: 0.13
Nodes (8): BENEFIT_ICONS, formatUzPhone(), HERO_SLIDES, LeadForm(), SEGMENT_ICONS, STATS, MatematikaLanding, MatematikaLanding

### Community 50 - "Mathjax"
Cohesion: 0.35
Nodes (9): b(), d(), f(), g(), e(), m(), p(), e() (+1 more)

### Community 51 - "Layout - Math Modal"
Cohesion: 0.18
Nodes (11): react-dom, buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal(), numbers (+3 more)

### Community 52 - "Components - Icons"
Cohesion: 0.18
Nodes (8): CoinsIcon(), DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil()

### Community 53 - "Teacher - Detail"
Cohesion: 0.17
Nodes (9): ChoiceAnswerInput(), CompositeAnswerInput(), ImageChoiceInput(), QuestionForm(), QuestionModal(), QuestionTypeSelect(), editorConfig, RichTextEditor() (+1 more)

### Community 54 - "Mathjax"
Cohesion: 0.16
Nodes (3): makeContentNode(), makeLeafNode(), makeMultipleContentNodes()

### Community 55 - "Home - Theme"
Cohesion: 0.19
Nodes (9): components(), DarkThemeColors, baseDarkTheme, baselightTheme, LightThemeColors, darkshadows, shadows, buildTheme() (+1 more)

### Community 56 - "Teacher - Kpi"
Cohesion: 0.20
Nodes (12): formatNumber(), getChurnStatus(), getConversion(), getCsatStatus(), getRatioStatus(), getRevenue(), KpiDashboard(), numberFormatter (+4 more)

### Community 57 - "Student - Chat"
Cohesion: 0.21
Nodes (8): ChatEmptyState(), ChatFilters(), ChatPagination(), ChatRequestCard(), ChatRequestList(), useChatData(), useStatusUtils(), ChatPage()

### Community 59 - "Mathjax"
Cohesion: 0.22
Nodes (4): e(), n(), setReference(), start()

### Community 62 - "Layout - Libs"
Cohesion: 0.26
Nodes (9): ProductsIcon(), AuthWelcome(), useSidebarCount(), getMenuItemClasses(), getMenuItems(), MenuType, RolesList, HIDDEN_MENU_KEYS_WHEN_INACTIVE (+1 more)

### Community 63 - "Components - Drag And Drop"
Cohesion: 0.27
Nodes (5): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, SortableItem(), DragIcon()

### Community 64 - "Components - Dashboard Nav"
Cohesion: 0.27
Nodes (6): DashboardNav(), MenuSection(), ProfileSection(), SpinnerIcon(), SidebarTitle(), createMenuConfig()

### Community 65 - "Tutor - Profile"
Cohesion: 0.24
Nodes (6): TutorProfileInfo(), TutorProfileQuickLinks(), TutorProfileStats(), formatPhone(), formatRegisteredAt(), TutorProfile()

### Community 68 - "Store"
Cohesion: 0.24
Nodes (4): zustand, config, useLangStore, useTopicStore

### Community 69 - "Pages - Ratings"
Cohesion: 0.22
Nodes (7): AVATAR_COLORS, COUNTS, getAvatarColor(), getInitial(), InitialAvatar(), PODIUM_STYLES, StudentTopLeaderboard()

### Community 71 - "Home - Form"
Cohesion: 0.22
Nodes (7): ref_forms_theme_elements_customformlabel, ref_forms_theme_elements_customselect, ref_forms_theme_elements_customtextfield, src_assets_images_frontend_pages_contact_shape1, Address(), ShapeBg, numbers

### Community 72 - "Home - Pricing"
Cohesion: 0.20
Nodes (8): src_assets_images_frontend_pages_payments_icon_american_express, src_assets_images_frontend_pages_payments_icon_diners, src_assets_images_frontend_pages_payments_icon_discover, src_assets_images_frontend_pages_payments_icon_jcb, src_assets_images_frontend_pages_payments_icon_masetro, src_assets_images_frontend_pages_payments_icon_mastercard, src_assets_images_frontend_pages_payments_icon_paypal, src_assets_images_frontend_pages_payments_icon_visa

### Community 73 - "Components - Uzbekistan Map"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 76 - "Components - Dashboard"
Cohesion: 0.28
Nodes (4): next-themes, MainContentHead(), MainContent(), Sidebar()

### Community 77 - "Home - Footer"
Cohesion: 0.22
Nodes (5): src_assets_images_frontend_pages_icons_icon_facebook, src_assets_images_frontend_pages_icons_icon_instagram, src_assets_images_frontend_pages_icons_icon_twitter, src_assets_images_logos_logoicon, footerLinks

### Community 78 - "Home - Features"
Cohesion: 0.25
Nodes (4): cardStyle, Features(), images, FeatureTitle()

### Community 79 - "Student - Utils"
Cohesion: 0.36
Nodes (7): CARD_ACCENTS, CardSubject(), colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "Teacher - Student Examples"
Cohesion: 0.36
Nodes (6): StudentExampleDetailLayout(), parseHtml(), StudentExampleQuestionList(), getArray(), parseMaybeJson(), StudentExampleDetailPage()

### Community 81 - "Pages - subscriptionPlans"
Cohesion: 0.25
Nodes (3): SubscriptionPlans(), openCreateModal(), resetForm()

### Community 82 - "Eslint.config"
Cohesion: 0.25
Nodes (7): compat, __dirname, eslintConfig, __filename, ref_eslint_eslintrc, ref_path, ref_url

### Community 84 - "Student - Panel"
Cohesion: 0.25
Nodes (3): react-circular-progressbar, ACCENTS, PanelCard()

### Community 85 - "Constants"
Cohesion: 0.36
Nodes (4): AppStoreButtons(), APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH

### Community 86 - "Constants"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 90 - "Library - Modal"
Cohesion: 0.43
Nodes (5): BuyBookModal(), nf(), PayPill(), purchaseAPI, toAbs()

### Community 91 - "Student - Home"
Cohesion: 0.33
Nodes (5): HomeRemindersCard(), REMINDER_STYLES, mockReminders, mockStreak, TODO: static placeholder data — swap for real API responses once the backend…

### Community 92 - "Tutor - Home"
Cohesion: 0.24
Nodes (3): TutorHomeGreeting(), UZ_MONTHS, TutorStatsGrid()

### Community 95 - "Services - I18n"
Cohesion: 0.33
Nodes (5): i18next, i18next-browser-languagedetector, src_services_i18n_translations_en, src_services_i18n_translations_ru, src_services_i18n_translations_uz

### Community 96 - "Home - Process"
Cohesion: 0.33
Nodes (4): src_assets_images_frontend_pages_homepage_feature_apps, src_assets_images_svgs_icon_briefcase, src_assets_images_svgs_icon_favorites, src_assets_images_svgs_icon_speech_bubble

### Community 97 - "Tutor - Profile"
Cohesion: 0.40
Nodes (4): src_assets_images_teacher_home_page, TutorHomeHero(), initialsOf(), TutorProfileHero()

### Community 99 - "Library - Components"
Cohesion: 0.40
Nodes (3): MyPurchasedBooks(), STATUS_CONFIG, toAbs()

### Community 100 - "Tutor - Profile"
Cohesion: 0.40
Nodes (4): ACTIVITY_META, TutorProfileActivity(), mockProfileActivity, TODO: statik ma'lumot — backendda tutor uchun "faoliyat tarixi" (activity feed)

### Community 101 - "Pages - Components"
Cohesion: 0.40
Nodes (4): categoryColors, SubscriptionPlansGrid(), commonAPI, subscriptionAPI

### Community 102 - "Package"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "Package"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 107 - "Student - Payment"
Cohesion: 0.40
Nodes (4): src_assets_images_logos_uzumlogo, src_assets_images_logos_uzumnasiya, NASIYA_TERMS, NasiyaInstallmentOption()

### Community 108 - "Home - Defend Focus"
Cohesion: 0.50
Nodes (4): HomePage(), newsApi, formatDate(), src_shared_utils_index_formatdate

### Community 109 - "Teacher - Student Examples"
Cohesion: 0.70
Nodes (4): cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel()

### Community 111 - "Pages - Games"
Cohesion: 0.60
Nodes (4): cache, handler(), pick(), toTitle()

### Community 116 - "Tutor - Groups"
Cohesion: 0.67
Nodes (3): averageColorFor(), CARD_COLORS, GroupCard()

### Community 117 - "Tutor - Home"
Cohesion: 0.67
Nodes (3): GROUP_ICON_BG, progressColor(), TutorGroupsCard()

### Community 118 - "Tutor - Home"
Cohesion: 0.67
Nodes (3): AVATAR_COLORS, initialsOf(), TutorRecentStudents()

### Community 124 - "Teacher - Subjects"
Cohesion: 0.67
Nodes (3): @ckeditor/ckeditor5-react, CKEditor, CKEditor

## Knowledge Gaps
- **271 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `paths` (+266 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 742 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **79 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Teacher - Statistics` to `Pages - [id]`, `Hooks - Api`, `Cupons module`, `Layout - Navbar`, `Student - Utils`, `Home - Faq`, `Chat Box - Components`, `Student - Exam`, `Components - Shared`, `Parent - Home`, `Student - Battle`, `Components - Topic`, `Parent - Profile`, `Student - Products`, `Tutor - Groups`, `Home - Auth`, `Student - Tabs`, `Home - Defend Focus`, `Home - Defend Focus`, `Home - Auth`, `Parent - Children`, `Student - Home`, `Pages - My Study`, `Pages - Games`, `Home - Header`, `Layout - Sidebar`, `Home - Games`, `Student - Payment`, `Home - Reviews`, `Dummy Data`, `Home - Exceptional Feature`, `Pages - Tasks`, `Pages - [id]`, `Components - Promo`, `Layout - Math Modal`, `Teacher - Detail`, `Home - Theme`, `Teacher - Kpi`, `Student - Chat`, `Layout - Libs`, `Components - Drag And Drop`, `Components - Dashboard Nav`, `Tutor - Profile`, `Pages - Ratings`, `Home - Form`, `Home - Pricing`, `Components - Uzbekistan Map`, `Components - Dashboard`, `Home - Footer`, `Home - Features`, `Student - Utils`, `Teacher - Student Examples`, `Student - Panel`, `Library - Modal`, `Tutor - Home`, `Home - Process`, `Pages - Components`, `Student - Payment`, `Home - Defend Focus`, `Tutor - Groups`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **Why does `react-i18next` connect `Pages - [id]` to `Parent - Profile`, `Hooks - Api`, `Parent - Profile`, `Cupons module`, `Teacher - Statistics`, `Layout - Navbar`, `Student - Utils`, `Home - Faq`, `Chat Box - Components`, `Student - Exam`, `Components - Shared`, `Parent - Home`, `Student - Battle`, `Components - Topic`, `Parent - Profile`, `Student - Products`, `Tutor - Groups`, `Home - Auth`, `Student - Tabs`, `Home - Defend Focus`, `Home - Auth`, `Parent - Children`, `Student - Home`, `Pages - My Study`, `Pages - Games`, `Home - Header`, `Layout - Sidebar`, `Student - Payment`, `Home - Reviews`, `Pages - Tasks`, `Pages - [id]`, `Components - Promo`, `Layout - Math Modal`, `Teacher - Detail`, `Student - Chat`, `Layout - Libs`, `Components - Dashboard Nav`, `Tutor - Profile`, `Pages - Ratings`, `Home - Features`, `Student - Utils`, `Teacher - Student Examples`, `Student - Panel`, `Library - Modal`, `Student - Home`, `Tutor - Home`, `Services - I18n`, `Tutor - Profile`, `Library - Components`, `Tutor - Profile`, `Pages - Components`, `Student - Payment`, `Home - Defend Focus`, `Teacher - Student Examples`, `Tutor - Groups`, `Tutor - Home`, `Tutor - Home`, `Tutor - Home`, `Student - Battle`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `next` connect `Parent - Profile` to `Pages - [id]`, `Hooks - Api`, `Cupons module`, `Teacher - Statistics`, `Layout - Navbar`, `Student - Utils`, `Home - Faq`, `Student - Exam`, `Components - Shared`, `Parent - Home`, `Student - Battle`, `Components - Topic`, `Student - Products`, `Tutor - Groups`, `Home - Auth`, `Student - Tabs`, `Home - Defend Focus`, `Home - Defend Focus`, `Home - Auth`, `Parent - Children`, `Student - Home`, `Pages - My Study`, `Home - Header`, `Layout - Sidebar`, `Home - Reviews`, `Dummy Data`, `Home - Exceptional Feature`, `Pages - Tasks`, `Pages - [id]`, `Components - Promo`, `Components - Icons`, `Student - Chat`, `Layout - Libs`, `Components - Dashboard Nav`, `Tutor - Profile`, `Pages - Ratings`, `Home - Form`, `Home - Pricing`, `Components - Dashboard`, `Home - Footer`, `Home - Features`, `Teacher - Student Examples`, `Constants`, `Home - Process`, `Tutor - Profile`, `Home - Defend Focus`, `Tutor - Home`, `Tutor - Home`, `Src`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _271 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages - [id]` be split into smaller, more focused modules?**
  _Cohesion score 0.0537280701754386 - nodes in this community are weakly interconnected._
- **Should `Hooks - Api` be split into smaller, more focused modules?**
  _Cohesion score 0.07082748948106592 - nodes in this community are weakly interconnected._
- **Should `Mathjax` be split into smaller, more focused modules?**
  _Cohesion score 0.06101231190150479 - nodes in this community are weakly interconnected._