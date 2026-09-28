# Graph Report - iqmath_student  (2026-09-28)

## Corpus Check
- 672 files · ~3,253,420 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .otf 18, .css 6, (none) 3)

## Summary
- 2675 nodes · 8295 edges · 167 communities (90 shown, 77 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3dcb8840`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react-i18next
- useGetQuery
- h
- BuyBookModal.jsx
- dependencies
- react
- src/hooks/index.js
- language/index.jsx
- ThemeSettings
- ChatBoxModule.js
- SubjectQuestions.jsx
- T
- @mui/material
- @heroui/react
- BattleArena.jsx
- package.json
- s
- usePostQuery
- PurchasedProducts.jsx
- c
- tex-mml-svg.js
- a
- TutorGroupDetail.jsx
- Auth.js
- next
- L
- _app.js
- @tabler/icons
- PricingContent.jsx
- history.js
- makeBranchNode
- HomeRemindersCard.jsx
- student/my-study/index.js
- gamesData.js
- HpHeader.js
- store/index.js
- i
- GameRenderer.js
- PricingModal.jsx
- o
- Q
- ReviewCarousel.js
- u
- framer-motion
- exceptional-feature/index.js
- [student_id].js
- .indexOf
- MatematikaLanding.jsx
- lucide-react
- .leaf_
- menuConfig.js
- Theme.js
- [id]/index.jsx
- KpiDashboard.jsx
- student/chat/index.js
- .merge
- n
- r
- StudentProfile.jsx
- menulist.js
- @dnd-kit/sortable
- dashboard-nav/index.jsx
- TutorProfile.jsx
- .setAttribute
- SidebarPlan.jsx
- ratings/index.js
- wrapAnswer.js
- form/index.js
- PaymentMethods.js
- uzbekistan-map/index.jsx
- .getChildren
- .add
- footer/index.js
- Landing.jsx
- useImageAccentColor.js
- cta/index.js
- SubscriptionPlans
- eslint.config.mjs
- PanelCard.jsx
- app-store-buttons/index.jsx
- ckeditor.js
- .defineRuleFromStrings
- .getValue
- defend-focus/index.js
- PricingCard.js
- process/index.js
- TutorProfileHero.jsx
- .generateSpeech
- MyPurchasedBooks.jsx
- TutorProfileActivity.jsx
- url.js
- devDependencies
- scripts
- video-player/index.jsx
- pauseValue
- better-react-mathjax
- Editing this README
- SubjectsBanner.jsx
- GroupCard.jsx
- TutorGroupsCard.jsx
- middleware.js
- compilerOptions
- next.config.mjs
- teacher/subjects/[id]/index.js
- TutorPromoCard.jsx
- react-icons
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- footer/index.jsx
- ParentChildrenCard.jsx
- Calculator.jsx
- DiagnosticSubjects.jsx
- TutorRecentStudents.jsx
- @ckeditor/ckeditor5-react
- TopicDetail.jsx

## God Nodes (most connected - your core abstractions)
1. `react` - 388 edges
2. `react-i18next` - 338 edges
3. `next` - 172 edges
4. `useGetQuery()` - 161 edges
5. `a()` - 142 edges
6. `T()` - 107 edges
7. `lucide-react` - 105 edges
8. `i()` - 104 edges
9. `URLS` - 99 edges
10. `Q()` - 91 edges

## Surprising Connections (you probably didn't know these)
- `ChildDetail()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/modules/parent/children/pages/ChildDetail.jsx → src/hooks/api/useGetQuery.js
- `LibraryPage()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/library/index.js → src/hooks/api/useGetQuery.js
- `Index()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/parent/results/[id]/index.jsx → src/hooks/api/useGetQuery.js
- `Index()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/student/diagnostics/recommended-topics/[id]/index.js → src/hooks/api/useGetQuery.js
- `Index()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/student/diagnostics/recommended-topics/index.js → src/hooks/api/useGetQuery.js

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (167 total, 77 thin omitted)

### Community 0 - "react-i18next"
Cohesion: 0.06
Nodes (14): react-i18next, HeaderTitle(), Individual(), LayoutAdmin(), ParentHome(), ParentProfile(), src_modules_student_products_components_index_loadingstate, ModalConfidentiality() (+6 more)

### Community 1 - "useGetQuery"
Cohesion: 0.07
Nodes (33): ref, ref_constants, next-auth, MainContentHead(), UserAgreement(), TopicDropdown(), NewsSingle(), useGetQuery() (+25 more)

### Community 3 - "BuyBookModal.jsx"
Cohesion: 0.13
Nodes (11): BookCard(), BookFilter(), INITIAL_FILTERS, BuyBookModal(), nf(), PayPill(), purchaseAPI, toAbs() (+3 more)

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+66 more)

### Community 5 - "react"
Cohesion: 0.03
Nodes (16): EyeIcon(), echarts-for-react, react, ref_react_router, RoomContext, TopicContext, days, heatmapData (+8 more)

### Community 6 - "src/hooks/index.js"
Cohesion: 0.07
Nodes (20): src_assets_images_mentor_background, BaseBreadcrumbs(), Header(), navLinks, PhoneIcon(), KEYS, src_hooks_index_usegetquery, MotivationCard() (+12 more)

### Community 7 - "language/index.jsx"
Cohesion: 0.17
Nodes (10): LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), NavbarLangue(), LayoutQuestion(), RecommendQuestions(), SubjectQuestions() (+2 more)

### Community 8 - "ThemeSettings"
Cohesion: 0.12
Nodes (18): src_assets_images_about_iqmath, src_assets_images_about_iqmath_banner_4k, Banner(), FEATURES, KeyMetric(), BannerGames(), BannerSingle(), ScrollToTop() (+10 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.06
Nodes (28): ChatBoxModule(), ChatHeader(), ChatsList(), formatDate(), CloseModal(), EmptyMessage(), IndependentResultCard(), MessageBubble() (+20 more)

### Community 10 - "SubjectQuestions.jsx"
Cohesion: 0.18
Nodes (18): html-react-parser, react-mathquill, SuccessPopupSendChat(), ActionCalculator(), ActionSolution(), ExamAnswerChoice(), compositeMathStyle, ExamAnswerComposite() (+10 more)

### Community 12 - "@mui/material"
Cohesion: 0.06
Nodes (9): @mui/material, ref_prop_types, keys, BannerFaq(), FAQ(), StyledAccordion, NewsBanner(), NewsAll() (+1 more)

### Community 13 - "@heroui/react"
Cohesion: 0.10
Nodes (14): @heroicons/react, @heroui/react, SimpleModal(), SuccessPopup(), useGetPlans(), EmptyCuponState(), ParentChangePasswordModal(), ParentEditInfoModal() (+6 more)

### Community 14 - "BattleArena.jsx"
Cohesion: 0.15
Nodes (14): BattleArena(), BattleChat(), AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial(), BattleQuestionCard(), DEFAULT_LETTER_STYLE (+6 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (37): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+29 more)

### Community 16 - "s"
Cohesion: 0.07
Nodes (3): s(), visit(), x()

### Community 17 - "usePostQuery"
Cohesion: 0.11
Nodes (28): RightIcon(), TrashIcon(), ImageUploader(), Input(), AnimateUp(), SelectBox(), postRequest(), usePostQuery() (+20 more)

### Community 18 - "PurchasedProducts.jsx"
Cohesion: 0.07
Nodes (23): dayjs, usePurchasedProducts(), EmptyState(), ErrorState(), src_modules_student_products_components_index_emptystate, src_modules_student_products_components_index_errorstate, src_modules_student_products_components_index_productgrid, LoadingState() (+15 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.07
Nodes (14): annotate(), applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_() (+6 more)

### Community 22 - "TutorGroupDetail.jsx"
Cohesion: 0.14
Nodes (21): UngroupedStudentsModal(), GROUPS_PATH, TEACHER_GROUP_KEYS, TeacherGroupDetail(), AddStudentsModal(), ConfirmModal(), GroupFormModal(), GroupStudentsTable() (+13 more)

### Community 23 - "Auth.js"
Cohesion: 0.15
Nodes (19): react-hook-form, InputPassword, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone, InputText, SelectClass() (+11 more)

### Community 24 - "next"
Cohesion: 0.07
Nodes (26): lodash, next, ProfileDetails(), NavbarCoins(), NavbarPoints(), NavbarSum(), ParentQuickActions(), CoinConvert() (+18 more)

### Community 26 - "_app.js"
Cohesion: 0.15
Nodes (10): i18next, i18next-browser-languagedetector, src_assets_styles_globals, reactQueryClient, UserProfileContext, UserProfileProvider(), src_services_i18n_translations_en, src_services_i18n_translations_ru (+2 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.08
Nodes (13): ref_react_syntax_highlighter, @tabler/icons, src_assets_images_frontend_pages_homepage_accordian1, src_assets_images_frontend_pages_homepage_notification_left, src_assets_images_frontend_pages_homepage_notification_right, src_assets_images_frontend_pages_homepage_notification_top_right, StyledAccordian, StyledAccordian (+5 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.20
Nodes (15): @mui/icons-material, src_data_gamesdata_mentalgames, safekidSeeds, Auth(), closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection() (+7 more)

### Community 29 - "history.js"
Cohesion: 0.14
Nodes (10): recharts, BattleLevelBadge(), LEVEL_COLORS, BattleRatingWidget(), BattleResultModal(), RESULT_META, BattleTimer(), BattleVsHeader() (+2 more)

### Community 30 - "makeBranchNode"
Cohesion: 0.20
Nodes (4): getFactory(), makeBranchNode(), makeEmptyNode(), parseList()

### Community 31 - "HomeRemindersCard.jsx"
Cohesion: 0.33
Nodes (5): HomeRemindersCard(), REMINDER_STYLES, mockReminders, mockStreak, TODO: static placeholder data — swap for real API responses once the backend…

### Community 32 - "student/my-study/index.js"
Cohesion: 0.14
Nodes (13): react-paginate, EmptyPage(), ButtonCellRenderer(), GridExample(), Pagination(), MyStudyAcitve(), NavbarStudy(), StudentExamplePagination() (+5 more)

### Community 33 - "gamesData.js"
Cohesion: 0.07
Nodes (27): src_assets_images_mental_games_animalcrush, src_assets_images_mental_games_colormemory, src_assets_images_mental_games_connector, src_assets_images_mental_games_findifference, src_assets_images_mental_games_fishingfrenzy, src_assets_images_mental_games_halloweenword, src_assets_images_mental_games_happyhellowen, src_assets_images_mental_games_impossible (+19 more)

### Community 34 - "HpHeader.js"
Cohesion: 0.20
Nodes (9): AppBarStyled, defaultLinks, DrawerHeader, HpHeader(), socialIcons, ToolbarStyled, MobileSidebar(), Navigations() (+1 more)

### Community 35 - "store/index.js"
Cohesion: 0.15
Nodes (11): zustand, Brand(), MainWrapper(), NavbarTitle(), Sidebar(), SidebarFooter(), SidebarLogo(), useCouponStore (+3 more)

### Community 37 - "GameRenderer.js"
Cohesion: 0.13
Nodes (15): BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle(), values (+7 more)

### Community 38 - "PricingModal.jsx"
Cohesion: 0.16
Nodes (14): src_assets_images_logos_uzumlogo, src_assets_images_logos_uzumnasiya, CouponSection(), src_modules_student_payment_components_index_couponsection, src_modules_student_payment_components_index_modalheader, src_modules_student_payment_components_index_plangrid, ModalHeader(), NASIYA_TERMS (+6 more)

### Community 42 - "ReviewCarousel.js"
Cohesion: 0.10
Nodes (14): react-slick, slick-carousel, src_assets_images_landingpage_apps_app_chat, src_assets_images_landingpage_apps_app_email, src_assets_images_landingpage_demos_demo_dark, src_assets_images_landingpage_demos_demo_horizontal, src_assets_images_landingpage_demos_demo_main, src_assets_images_landingpage_demos_demo_rtl (+6 more)

### Community 44 - "framer-motion"
Cohesion: 0.10
Nodes (16): framer-motion, InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions (+8 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.10
Nodes (19): src_assets_images_frontend_pages_icons_icon_chart, src_assets_images_frontend_pages_icons_icon_color, src_assets_images_frontend_pages_icons_icon_components, src_assets_images_frontend_pages_icons_icon_customize, src_assets_images_frontend_pages_icons_icon_framework, src_assets_images_frontend_pages_icons_icon_icons, src_assets_images_frontend_pages_icons_icon_pages, src_assets_images_frontend_pages_icons_icon_responsive (+11 more)

### Community 46 - "[student_id].js"
Cohesion: 0.06
Nodes (36): react-dom, Eye(), buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal() (+28 more)

### Community 47 - ".indexOf"
Cohesion: 0.35
Nodes (9): b(), d(), f(), g(), e(), m(), p(), e() (+1 more)

### Community 48 - "MatematikaLanding.jsx"
Cohesion: 0.13
Nodes (8): BENEFIT_ICONS, formatUzPhone(), HERO_SLIDES, LeadForm(), SEGMENT_ICONS, STATS, MatematikaLanding, MatematikaLanding

### Community 50 - "lucide-react"
Cohesion: 0.06
Nodes (16): lucide-react, src_assets_images_battle_qoida, src_assets_parent_background, ParentHomeHero(), ParentStatsGrid(), ParentProfileInfoCard(), ParentProfileQuickActions(), BattleRulesCard() (+8 more)

### Community 51 - ".leaf_"
Cohesion: 0.16
Nodes (3): makeContentNode(), makeLeafNode(), makeMultipleContentNodes()

### Community 52 - "menuConfig.js"
Cohesion: 0.18
Nodes (8): CoinsIcon(), DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil()

### Community 53 - "Theme.js"
Cohesion: 0.19
Nodes (9): components(), DarkThemeColors, baseDarkTheme, baselightTheme, LightThemeColors, darkshadows, shadows, buildTheme() (+1 more)

### Community 55 - "[id]/index.jsx"
Cohesion: 0.19
Nodes (7): ActivityTable(), ChildNotFoundState(), NoActivityState(), ChildDetail(), getRoleForAPI(), StudentDetails(), Index()

### Community 56 - "KpiDashboard.jsx"
Cohesion: 0.18
Nodes (12): formatNumber(), getChurnStatus(), getConversion(), getCsatStatus(), getRatioStatus(), getRevenue(), KpiDashboard(), numberFormatter (+4 more)

### Community 57 - "student/chat/index.js"
Cohesion: 0.21
Nodes (8): ChatEmptyState(), ChatFilters(), ChatPagination(), ChatRequestCard(), ChatRequestList(), useChatData(), useStatusUtils(), ChatPage()

### Community 59 - "n"
Cohesion: 0.22
Nodes (4): e(), n(), setReference(), start()

### Community 61 - "StudentProfile.jsx"
Cohesion: 0.28
Nodes (8): StudentProfile(), CoinsHistoryTab(), CoinsTab(), CouponsTab(), FinesTab(), ProfileInfoTab(), ReferralTab(), TransferTab()

### Community 62 - "menulist.js"
Cohesion: 0.36
Nodes (7): ProductsIcon(), useSidebarCount(), getMenuItemClasses(), getMenuItems(), MenuType, HIDDEN_MENU_KEYS_WHEN_INACTIVE, SidebarMenu()

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.27
Nodes (5): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, SortableItem(), DragIcon()

### Community 64 - "dashboard-nav/index.jsx"
Cohesion: 0.20
Nodes (8): next-themes, DashboardNav(), MainContent(), MenuSection(), ProfileSection(), Sidebar(), SidebarTitle(), createMenuConfig()

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.19
Nodes (7): TutorProfileInfo(), TutorProfileQuickLinks(), PERIODS, TutorProfileStats(), formatPhone(), formatRegisteredAt(), TutorProfile()

### Community 68 - "SidebarPlan.jsx"
Cohesion: 0.15
Nodes (13): config, SidebarPlan(), CardDiagnostic(), scoreColor(), CardLockedSubject(), CardSubject(), DEFAULT_THEME, CardSubjectWithProgress() (+5 more)

### Community 69 - "ratings/index.js"
Cohesion: 0.12
Nodes (13): src_hooks_index_usepostquery, TransferConfirm(), TransferForm(), TransferHistory(), SomTransfer(), STEPS, AVATAR_COLORS, COUNTS (+5 more)

### Community 70 - "wrapAnswer.js"
Cohesion: 0.40
Nodes (10): addWrapper(), isSimpleNumber(), isWrapped(), needsWrapper(), normalizeAnswerForBackend(), normalizeLatex(), normalizeMultiplicationForBackend(), stripDelimiters() (+2 more)

### Community 71 - "form/index.js"
Cohesion: 0.22
Nodes (7): ref_forms_theme_elements_customformlabel, ref_forms_theme_elements_customselect, ref_forms_theme_elements_customtextfield, src_assets_images_frontend_pages_contact_shape1, Address(), ShapeBg, numbers

### Community 72 - "PaymentMethods.js"
Cohesion: 0.20
Nodes (8): src_assets_images_frontend_pages_payments_icon_american_express, src_assets_images_frontend_pages_payments_icon_diners, src_assets_images_frontend_pages_payments_icon_discover, src_assets_images_frontend_pages_payments_icon_jcb, src_assets_images_frontend_pages_payments_icon_masetro, src_assets_images_frontend_pages_payments_icon_mastercard, src_assets_images_frontend_pages_payments_icon_paypal, src_assets_images_frontend_pages_payments_icon_visa

### Community 73 - "uzbekistan-map/index.jsx"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 77 - "footer/index.js"
Cohesion: 0.22
Nodes (5): src_assets_images_frontend_pages_icons_icon_facebook, src_assets_images_frontend_pages_icons_icon_instagram, src_assets_images_frontend_pages_icons_icon_twitter, src_assets_images_logos_logoicon, footerLinks

### Community 78 - "Landing.jsx"
Cohesion: 0.08
Nodes (19): swiper, Benefits(), Courses(), HomePage(), newsApi, cardStyle, Features(), images (+11 more)

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "cta/index.js"
Cohesion: 0.33
Nodes (5): SpinnerIcon(), SimpleLoader(), AuthWelcome(), CTA(), RolesList

### Community 81 - "SubscriptionPlans"
Cohesion: 0.25
Nodes (3): SubscriptionPlans(), openCreateModal(), resetForm()

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (7): compat, __dirname, eslintConfig, __filename, ref_eslint_eslintrc, ref_path, ref_url

### Community 84 - "PanelCard.jsx"
Cohesion: 0.25
Nodes (3): react-circular-progressbar, ACCENTS, PanelCard()

### Community 85 - "app-store-buttons/index.jsx"
Cohesion: 0.36
Nodes (4): AppStoreButtons(), APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 90 - "defend-focus/index.js"
Cohesion: 0.33
Nodes (4): NEWS, newsApi, newsApi, NewsSlider()

### Community 91 - "PricingCard.js"
Cohesion: 0.33
Nodes (4): src_assets_images_frontend_pages_icons_icon_check, src_assets_images_frontend_pages_icons_icon_close, BaseCard(), Licenses

### Community 96 - "process/index.js"
Cohesion: 0.33
Nodes (4): src_assets_images_frontend_pages_homepage_feature_apps, src_assets_images_svgs_icon_briefcase, src_assets_images_svgs_icon_favorites, src_assets_images_svgs_icon_speech_bubble

### Community 97 - "TutorProfileHero.jsx"
Cohesion: 0.40
Nodes (4): src_assets_images_teacher_home_page, TutorHomeHero(), initialsOf(), TutorProfileHero()

### Community 99 - "MyPurchasedBooks.jsx"
Cohesion: 0.40
Nodes (3): MyPurchasedBooks(), STATUS_CONFIG, toAbs()

### Community 100 - "TutorProfileActivity.jsx"
Cohesion: 0.40
Nodes (4): ACTIVITY_META, TutorProfileActivity(), mockProfileActivity, TODO: statik ma'lumot — backendda tutor uchun "faoliyat tarixi" (activity feed)

### Community 101 - "url.js"
Cohesion: 0.08
Nodes (25): ag-grid-community, ag-grid-react, clsx, react-hot-toast, ContentLoader(), SearchInput(), TODO: backend tayyor bo'lganda shu manzilni almashtiring., URLS (+17 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 104 - "video-player/index.jsx"
Cohesion: 0.50
Nodes (3): react-player, CloseIcon(), ReactPlayer

### Community 109 - "better-react-mathjax"
Cohesion: 0.20
Nodes (11): better-react-mathjax, cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), StudentExampleDetailLayout(), parseHtml(), StudentExampleQuestionList() (+3 more)

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 113 - "GroupCard.jsx"
Cohesion: 0.67
Nodes (3): averageColorFor(), CARD_COLORS, GroupCard()

### Community 117 - "TutorGroupsCard.jsx"
Cohesion: 0.67
Nodes (3): GROUP_ICON_BG, progressColor(), TutorGroupsCard()

### Community 124 - "teacher/subjects/[id]/index.js"
Cohesion: 0.08
Nodes (32): axios, @tanstack/react-query, Button(), EditIcon(), QuestionCountIcon(), VideoPlayer(), useDeleteQuery(), useDeleteQuestion() (+24 more)

### Community 127 - "react-icons"
Cohesion: 0.14
Nodes (4): react-icons, MultiplicationModal(), numbers, NavbarBackTeacher()

### Community 129 - "test-calc/index.js"
Cohesion: 0.19
Nodes (6): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, MathKeyboard

### Community 165 - "footer/index.jsx"
Cohesion: 0.24
Nodes (6): Footer(), InstagramIcon(), TelegramIcon(), YoutubeIcon(), AuthLanding(), BannerHeader()

### Community 169 - "Calculator.jsx"
Cohesion: 0.38
Nodes (4): Calculator(), availableMathSymbols, MathSymbols(), symbolsList

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.13
Nodes (16): SectionHeader(), COMPLETED_COLOR, IN_PROGRESS_COLOR, NOT_STARTED_COLOR, percent(), StatsCard(), SubjectsStats(), DiagnosticSubjects() (+8 more)

### Community 172 - "TutorRecentStudents.jsx"
Cohesion: 0.67
Nodes (3): AVATAR_COLORS, initialsOf(), TutorRecentStudents()

### Community 173 - "@ckeditor/ckeditor5-react"
Cohesion: 0.67
Nodes (3): @ckeditor/ckeditor5-react, CKEditor, CKEditor

### Community 175 - "TopicDetail.jsx"
Cohesion: 0.19
Nodes (3): formatDuration(), TopicDetail(), StudentBreadcrumbs()

## Knowledge Gaps
- **292 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `paths` (+287 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 771 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **77 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `react-i18next`, `useGetQuery`, `test-calc/index.js`, `BuyBookModal.jsx`, `src/hooks/index.js`, `language/index.jsx`, `ThemeSettings`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `@mui/material`, `@heroui/react`, `BattleArena.jsx`, `package.json`, `usePostQuery`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `Auth.js`, `next`, `_app.js`, `@tabler/icons`, `PricingContent.jsx`, `history.js`, `student/my-study/index.js`, `gamesData.js`, `HpHeader.js`, `store/index.js`, `footer/index.jsx`, `GameRenderer.js`, `PricingModal.jsx`, `Calculator.jsx`, `ReviewCarousel.js`, `DiagnosticSubjects.jsx`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `TopicDetail.jsx`, `MatematikaLanding.jsx`, `lucide-react`, `Theme.js`, `[id]/index.jsx`, `KpiDashboard.jsx`, `student/chat/index.js`, `StudentProfile.jsx`, `menulist.js`, `@dnd-kit/sortable`, `dashboard-nav/index.jsx`, `TutorProfile.jsx`, `SidebarPlan.jsx`, `ratings/index.js`, `form/index.js`, `PaymentMethods.js`, `uzbekistan-map/index.jsx`, `footer/index.js`, `Landing.jsx`, `useImageAccentColor.js`, `cta/index.js`, `PanelCard.jsx`, `defend-focus/index.js`, `PricingCard.js`, `process/index.js`, `url.js`, `video-player/index.jsx`, `better-react-mathjax`, `GroupCard.jsx`, `teacher/subjects/[id]/index.js`, `react-icons`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `react-i18next` connect `react-i18next` to `useGetQuery`, `BuyBookModal.jsx`, `react`, `src/hooks/index.js`, `language/index.jsx`, `ThemeSettings`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `@mui/material`, `@heroui/react`, `BattleArena.jsx`, `package.json`, `usePostQuery`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `Auth.js`, `next`, `_app.js`, `PricingContent.jsx`, `history.js`, `HomeRemindersCard.jsx`, `student/my-study/index.js`, `gamesData.js`, `HpHeader.js`, `store/index.js`, `footer/index.jsx`, `PricingModal.jsx`, `ParentChildrenCard.jsx`, `ReviewCarousel.js`, `DiagnosticSubjects.jsx`, `framer-motion`, `TutorRecentStudents.jsx`, `[student_id].js`, `TopicDetail.jsx`, `MatematikaLanding.jsx`, `lucide-react`, `[id]/index.jsx`, `KpiDashboard.jsx`, `student/chat/index.js`, `StudentProfile.jsx`, `menulist.js`, `dashboard-nav/index.jsx`, `TutorProfile.jsx`, `SidebarPlan.jsx`, `ratings/index.js`, `Landing.jsx`, `cta/index.js`, `PanelCard.jsx`, `defend-focus/index.js`, `TutorProfileHero.jsx`, `MyPurchasedBooks.jsx`, `TutorProfileActivity.jsx`, `url.js`, `better-react-mathjax`, `SubjectsBanner.jsx`, `GroupCard.jsx`, `TutorGroupsCard.jsx`, `teacher/subjects/[id]/index.js`, `TutorPromoCard.jsx`, `react-icons`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `react-i18next`, `useGetQuery`, `test-calc/index.js`, `BuyBookModal.jsx`, `react`, `src/hooks/index.js`, `language/index.jsx`, `ThemeSettings`, `SubjectQuestions.jsx`, `@mui/material`, `@heroui/react`, `BattleArena.jsx`, `package.json`, `usePostQuery`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `Auth.js`, `@tabler/icons`, `PricingContent.jsx`, `history.js`, `student/my-study/index.js`, `HpHeader.js`, `store/index.js`, `footer/index.jsx`, `ParentChildrenCard.jsx`, `ReviewCarousel.js`, `DiagnosticSubjects.jsx`, `framer-motion`, `exceptional-feature/index.js`, `TutorRecentStudents.jsx`, `TopicDetail.jsx`, `[student_id].js`, `MatematikaLanding.jsx`, `menuConfig.js`, `[id]/index.jsx`, `student/chat/index.js`, `menulist.js`, `dashboard-nav/index.jsx`, `TutorProfile.jsx`, `SidebarPlan.jsx`, `ratings/index.js`, `form/index.js`, `PaymentMethods.js`, `footer/index.js`, `Landing.jsx`, `cta/index.js`, `app-store-buttons/index.jsx`, `defend-focus/index.js`, `PricingCard.js`, `process/index.js`, `TutorProfileActivity.jsx`, `url.js`, `video-player/index.jsx`, `better-react-mathjax`, `TutorGroupsCard.jsx`, `middleware.js`, `teacher/subjects/[id]/index.js`, `react-icons`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _292 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react-i18next` be split into smaller, more focused modules?**
  _Cohesion score 0.05995410212277682 - nodes in this community are weakly interconnected._
- **Should `useGetQuery` be split into smaller, more focused modules?**
  _Cohesion score 0.06533575317604355 - nodes in this community are weakly interconnected._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06101231190150479 - nodes in this community are weakly interconnected._