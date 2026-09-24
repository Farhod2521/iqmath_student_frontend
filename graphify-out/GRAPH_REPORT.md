# Graph Report - iqmath_student  (2026-09-24)

## Corpus Check
- 668 files · ~3,251,605 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .otf 18, .css 6, (none) 3)

## Summary
- 2654 nodes · 8244 edges · 176 communities (95 shown, 81 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `93b0e8bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react-i18next
- useGetQuery
- h
- SomTransfer.jsx
- dependencies
- react
- next-auth
- useKeyboardShortcut
- @mui/material
- ChatBoxModule.js
- SubjectQuestions.jsx
- T
- ref_prop_types
- ParentHome.jsx
- BattleArena.jsx
- package.json
- s
- react-hot-toast
- PurchasedProducts.jsx
- c
- tex-mml-svg.js
- a
- TutorGroupDetail.jsx
- Auth.js
- next
- L
- @tanstack/react-query
- @tabler/icons
- PricingContent.jsx
- @heroui/react
- makeBranchNode
- StudentHome.jsx
- student/my-study/index.js
- gamesData.js
- HpHeader.js
- Sidebar.jsx
- i
- GameRenderer.js
- request
- o
- Q
- DozensCarousel.js
- u
- framer-motion
- exceptional-feature/index.js
- [student_id].js
- student/subjects/[id]/index.js
- MatematikaLanding.jsx
- .indexOf
- react-dom
- menuConfig.js
- QuestionForm.jsx
- .leaf_
- Theme.js
- KpiDashboard.jsx
- student/chat/index.js
- n
- .merge
- r
- menulist.js
- @dnd-kit/sortable
- dashboard-nav/index.jsx
- TutorProfile.jsx
- .setAttribute
- store/index.js
- ratings/index.js
- .getChildren
- form/index.js
- PaymentMethods.js
- uzbekistan-map/index.jsx
- .add
- dashboard/index.jsx
- footer/index.js
- Features.js
- CardSubject.jsx
- student-examples/[id]/index.js
- subscriptionPlans/index.js
- eslint.config.mjs
- PanelCard.jsx
- app-store-buttons/index.jsx
- ckeditor.js
- .defineRuleFromStrings
- .getValue
- BuyBookModal.jsx
- HomeRemindersCard.jsx
- TutorStatsGrid.jsx
- i18n/index.js
- process/index.js
- TutorProfileHero.jsx
- TopicDetail.jsx
- MyPurchasedBooks.jsx
- TutorProfileActivity.jsx
- StudentTable.jsx
- devDependencies
- scripts
- .generateSpeech
- Referrals.jsx
- Landing.jsx
- better-react-mathjax
- Editing this README
- pauseValue
- lucide-react
- TutorHome.jsx
- history.js
- compilerOptions
- next.config.mjs
- api/index.js
- TutorPromoCard.jsx
- BattleSetupForm.jsx
- StudentDetails.jsx
- echarts-for-react
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- footer/index.jsx
- wrapAnswer.js
- ReviewCarousel.js
- ProductsExchange.jsx
- Calculator.jsx
- SubjectsBanner.jsx
- roomTypeProvider.js
- StatisticsHero.jsx
- TutorHomeGreeting.jsx
- TutorProfileInfo.jsx
- react-player

## God Nodes (most connected - your core abstractions)
1. `react` - 387 edges
2. `react-i18next` - 336 edges
3. `next` - 172 edges
4. `useGetQuery()` - 159 edges
5. `a()` - 142 edges
6. `T()` - 107 edges
7. `lucide-react` - 104 edges
8. `i()` - 104 edges
9. `URLS` - 98 edges
10. `Q()` - 91 edges

## Surprising Connections (you probably didn't know these)
- `ChildDetail()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/modules/parent/children/pages/ChildDetail.jsx → src/hooks/api/useGetQuery.js
- `Index()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/parent/results/[id]/index.jsx → src/hooks/api/useGetQuery.js
- `Index()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/parent/results/index.jsx → src/hooks/api/useGetQuery.js
- `SubjectsPage()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/student/subjects/[id]/index.js → src/hooks/api/useGetQuery.js
- `SendToMentorModal()` --calls--> `usePostQuery()`  [EXTRACTED]
  src/modules/student/subjects/components/modal/SendToMentorModal.jsx → src/hooks/api/usePostQuery.js

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (176 total, 81 thin omitted)

### Community 0 - "react-i18next"
Cohesion: 0.06
Nodes (18): react-i18next, HeaderTitle(), Individual(), LayoutAdmin(), src_modules_student_products_components_index_loadingstate, LoadingState(), ParentsManagement(), SubjectBreadcrumbs() (+10 more)

### Community 1 - "useGetQuery"
Cohesion: 0.07
Nodes (42): ref_constants, MainContentHead(), Header(), navLinks, PhoneIcon(), UserAgreement(), ProfileDetails(), TopicDropdown() (+34 more)

### Community 3 - "SomTransfer.jsx"
Cohesion: 0.21
Nodes (7): src_hooks_index_usepostquery, TransferConfirm(), TransferForm(), TransferHistory(), SomTransfer(), STEPS, TutorPayments()

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+66 more)

### Community 5 - "react"
Cohesion: 0.03
Nodes (9): react, ref_react_router, TopicContext, keys, MultiplicationModal(), numbers, leaderboard, recentActivity (+1 more)

### Community 6 - "next-auth"
Cohesion: 0.09
Nodes (18): ref, lodash, next-auth, BaseBreadcrumbs(), ContentLoader(), ParentProfileHero(), ParentProfileInfoCard(), ParentProfileQuickActions() (+10 more)

### Community 7 - "useKeyboardShortcut"
Cohesion: 0.23
Nodes (5): useKeyboardShortcut(), LayoutQuestion(), LayoutQuestion(), DiagnosticQuestions(), useTopicStore

### Community 8 - "@mui/material"
Cohesion: 0.12
Nodes (24): @mui/material, src_assets_images_about_iqmath, src_assets_images_about_iqmath_banner_4k, Footer(), Banner(), FEATURES, KeyMetric(), BannerFaq() (+16 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.05
Nodes (33): swiper, HomePage(), newsApi, ChatBoxModule(), ChatHeader(), ChatsList(), formatDate(), CloseModal() (+25 more)

### Community 10 - "SubjectQuestions.jsx"
Cohesion: 0.22
Nodes (14): react-mathquill, ActionCalculator(), ActionInfo(), ActionSolution(), ExamAnswerChoice(), compositeMathStyle, ExamAnswerComposite(), ExamAnswerImage() (+6 more)

### Community 12 - "ref_prop_types"
Cohesion: 0.09
Nodes (5): ref_prop_types, src_assets_images_frontend_pages_icons_icon_check, src_assets_images_frontend_pages_icons_icon_close, BaseCard(), Licenses

### Community 13 - "ParentHome.jsx"
Cohesion: 0.10
Nodes (10): src_assets_parent_background, MyChildren(), AVATAR_COLORS, ParentChildrenCard(), ParentHomeHero(), ParentQuickActions(), ParentStatsGrid(), ParentHome() (+2 more)

### Community 14 - "BattleArena.jsx"
Cohesion: 0.15
Nodes (14): BattleArena(), BattleChat(), AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial(), BattleQuestionCard(), DEFAULT_LETTER_STYLE (+6 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (37): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+29 more)

### Community 16 - "s"
Cohesion: 0.07
Nodes (3): s(), visit(), x()

### Community 17 - "react-hot-toast"
Cohesion: 0.21
Nodes (16): react-hot-toast, RightIcon(), TrashIcon(), ImageUploader(), AnimateUp(), postRequest(), usePostQuery(), NavbarNotification() (+8 more)

### Community 18 - "PurchasedProducts.jsx"
Cohesion: 0.11
Nodes (16): dayjs, EmptyState(), ErrorState(), src_modules_student_products_components_index_emptystate, src_modules_student_products_components_index_errorstate, src_modules_student_products_components_index_productgrid, ProductCard(), ProductGrid() (+8 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.07
Nodes (14): annotate(), applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_() (+6 more)

### Community 22 - "TutorGroupDetail.jsx"
Cohesion: 0.26
Nodes (12): UngroupedStudentsModal(), AddStudentsModal(), GroupStudentsTable(), InviteStudentModal(), PendingInvitationsList(), TutorGroupDetail(), useGroupMutation(), apiErrorMessage() (+4 more)

### Community 23 - "Auth.js"
Cohesion: 0.13
Nodes (23): react-hook-form, InputPassword, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone, InputText, SelectClass() (+15 more)

### Community 24 - "next"
Cohesion: 0.09
Nodes (21): next, CoinsIcon(), NavbarCoins(), NavbarPoints(), NavbarSum(), config, CoinConvert(), RATES (+13 more)

### Community 26 - "@tanstack/react-query"
Cohesion: 0.11
Nodes (12): @tanstack/react-query, src_assets_styles_globals, reactQueryClient, UserProfileContext, UserProfileProvider(), NEWS, newsApi, newsApi (+4 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.08
Nodes (13): ref_react_syntax_highlighter, @tabler/icons, src_assets_images_frontend_pages_homepage_accordian1, src_assets_images_frontend_pages_homepage_notification_left, src_assets_images_frontend_pages_homepage_notification_right, src_assets_images_frontend_pages_homepage_notification_top_right, StyledAccordian, StyledAccordian (+5 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.19
Nodes (15): @mui/icons-material, src_data_gamesdata_mentalgames, safekidSeeds, Auth(), closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection() (+7 more)

### Community 29 - "@heroui/react"
Cohesion: 0.11
Nodes (14): @heroui/react, Input(), SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), useGetPlans(), ParentChangePasswordModal(), ParentEditInfoModal() (+6 more)

### Community 30 - "makeBranchNode"
Cohesion: 0.20
Nodes (4): getFactory(), makeBranchNode(), makeEmptyNode(), parseList()

### Community 31 - "StudentHome.jsx"
Cohesion: 0.15
Nodes (11): buildMonthGrid(), formatDDMMYYYY(), HomeCalendarCard(), MONTH_LABELS_UZ, WEEKDAYS_UZ, HomeHero(), HomeRecentActivity(), HomeStatsGrid() (+3 more)

### Community 32 - "student/my-study/index.js"
Cohesion: 0.26
Nodes (8): EmptyPage(), ButtonCellRenderer(), MyStudyAcitve(), NavbarStudy(), colDefs, Index(), src_store_index_usemystudystore, useMyStudyStore

### Community 33 - "gamesData.js"
Cohesion: 0.08
Nodes (24): src_assets_images_mental_games_animalcrush, src_assets_images_mental_games_colormemory, src_assets_images_mental_games_connector, src_assets_images_mental_games_findifference, src_assets_images_mental_games_fishingfrenzy, src_assets_images_mental_games_halloweenword, src_assets_images_mental_games_happyhellowen, src_assets_images_mental_games_impossible (+16 more)

### Community 34 - "HpHeader.js"
Cohesion: 0.20
Nodes (9): AppBarStyled, defaultLinks, DrawerHeader, HpHeader(), socialIcons, ToolbarStyled, MobileSidebar(), Navigations() (+1 more)

### Community 35 - "Sidebar.jsx"
Cohesion: 0.14
Nodes (17): Brand(), Main(), MainWrapper(), NavbarTitle(), Sidebar(), SidebarFooter(), SidebarLogo(), SidebarPlan() (+9 more)

### Community 37 - "GameRenderer.js"
Cohesion: 0.13
Nodes (15): BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle(), values (+7 more)

### Community 38 - "request"
Cohesion: 0.11
Nodes (22): react-icons, src_assets_images_logos_uzumlogo, src_assets_images_logos_uzumnasiya, Button(), CouponModal(), CouponSection(), src_modules_student_payment_components_index_couponsection, src_modules_student_payment_components_index_modalheader (+14 more)

### Community 42 - "DozensCarousel.js"
Cohesion: 0.18
Nodes (8): react-slick, slick-carousel, src_assets_images_landingpage_apps_app_chat, src_assets_images_landingpage_apps_app_email, src_assets_images_landingpage_demos_demo_dark, src_assets_images_landingpage_demos_demo_horizontal, src_assets_images_landingpage_demos_demo_main, src_assets_images_landingpage_demos_demo_rtl

### Community 44 - "framer-motion"
Cohesion: 0.13
Nodes (14): framer-motion, InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions (+6 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.10
Nodes (19): src_assets_images_frontend_pages_icons_icon_chart, src_assets_images_frontend_pages_icons_icon_color, src_assets_images_frontend_pages_icons_icon_components, src_assets_images_frontend_pages_icons_icon_customize, src_assets_images_frontend_pages_icons_icon_framework, src_assets_images_frontend_pages_icons_icon_icons, src_assets_images_frontend_pages_icons_icon_pages, src_assets_images_frontend_pages_icons_icon_responsive (+11 more)

### Community 46 - "[student_id].js"
Cohesion: 0.18
Nodes (17): Eye(), DailyTaskDetailModal(), buildApiParams(), DailyTasksPage(), formatScore(), getCurrentWeek(), getDaysInRange(), getLocalizedName() (+9 more)

### Community 47 - "student/subjects/[id]/index.js"
Cohesion: 0.28
Nodes (3): MotivationCard(), ProgressMeter(), SubjectsPage()

### Community 48 - "MatematikaLanding.jsx"
Cohesion: 0.13
Nodes (8): BENEFIT_ICONS, formatUzPhone(), HERO_SLIDES, LeadForm(), SEGMENT_ICONS, STATS, MatematikaLanding, MatematikaLanding

### Community 50 - ".indexOf"
Cohesion: 0.35
Nodes (9): b(), d(), f(), g(), e(), m(), p(), e() (+1 more)

### Community 51 - "react-dom"
Cohesion: 0.21
Nodes (10): react-dom, buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal(), numbers (+2 more)

### Community 52 - "menuConfig.js"
Cohesion: 0.20
Nodes (7): DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil()

### Community 53 - "QuestionForm.jsx"
Cohesion: 0.19
Nodes (8): ChoiceAnswerInput(), CompositeAnswerInput(), ImageChoiceInput(), QuestionForm(), QuestionTypeSelect(), editorConfig, RichTextEditor(), TextAnswerInput()

### Community 54 - ".leaf_"
Cohesion: 0.16
Nodes (3): makeContentNode(), makeLeafNode(), makeMultipleContentNodes()

### Community 55 - "Theme.js"
Cohesion: 0.19
Nodes (9): components(), DarkThemeColors, baseDarkTheme, baselightTheme, LightThemeColors, darkshadows, shadows, buildTheme() (+1 more)

### Community 56 - "KpiDashboard.jsx"
Cohesion: 0.20
Nodes (12): formatNumber(), getChurnStatus(), getConversion(), getCsatStatus(), getRatioStatus(), getRevenue(), KpiDashboard(), numberFormatter (+4 more)

### Community 57 - "student/chat/index.js"
Cohesion: 0.21
Nodes (8): ChatEmptyState(), ChatFilters(), ChatPagination(), ChatRequestCard(), ChatRequestList(), useChatData(), useStatusUtils(), ChatPage()

### Community 59 - "n"
Cohesion: 0.22
Nodes (4): e(), n(), setReference(), start()

### Community 62 - "menulist.js"
Cohesion: 0.39
Nodes (6): ProductsIcon(), getMenuItemClasses(), getMenuItems(), MenuType, HIDDEN_MENU_KEYS_WHEN_INACTIVE, SidebarMenu()

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.24
Nodes (6): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, SortableItem(), DragIcon(), SortableTableRow()

### Community 64 - "dashboard-nav/index.jsx"
Cohesion: 0.39
Nodes (5): DashboardNav(), MenuSection(), ProfileSection(), SidebarTitle(), createMenuConfig()

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.33
Nodes (5): TutorProfileQuickLinks(), TutorProfileStats(), formatPhone(), formatRegisteredAt(), TutorProfile()

### Community 68 - "store/index.js"
Cohesion: 0.17
Nodes (8): zustand, LanguageDropdown(), languages, StudentBreadcrumbs(), NavbarLangue(), src_store_index_usesettingsstore, useLangStore, useSettingsStore

### Community 69 - "ratings/index.js"
Cohesion: 0.22
Nodes (7): AVATAR_COLORS, COUNTS, getAvatarColor(), getInitial(), InitialAvatar(), PODIUM_STYLES, StudentTopLeaderboard()

### Community 71 - "form/index.js"
Cohesion: 0.22
Nodes (7): ref_forms_theme_elements_customformlabel, ref_forms_theme_elements_customselect, ref_forms_theme_elements_customtextfield, src_assets_images_frontend_pages_contact_shape1, Address(), ShapeBg, numbers

### Community 72 - "PaymentMethods.js"
Cohesion: 0.20
Nodes (8): src_assets_images_frontend_pages_payments_icon_american_express, src_assets_images_frontend_pages_payments_icon_diners, src_assets_images_frontend_pages_payments_icon_discover, src_assets_images_frontend_pages_payments_icon_jcb, src_assets_images_frontend_pages_payments_icon_masetro, src_assets_images_frontend_pages_payments_icon_mastercard, src_assets_images_frontend_pages_payments_icon_paypal, src_assets_images_frontend_pages_payments_icon_visa

### Community 73 - "uzbekistan-map/index.jsx"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 76 - "dashboard/index.jsx"
Cohesion: 0.38
Nodes (3): next-themes, MainContent(), Sidebar()

### Community 77 - "footer/index.js"
Cohesion: 0.22
Nodes (5): src_assets_images_frontend_pages_icons_icon_facebook, src_assets_images_frontend_pages_icons_icon_instagram, src_assets_images_frontend_pages_icons_icon_twitter, src_assets_images_logos_logoicon, footerLinks

### Community 78 - "Features.js"
Cohesion: 0.25
Nodes (4): cardStyle, Features(), images, FeatureTitle()

### Community 79 - "CardSubject.jsx"
Cohesion: 0.36
Nodes (7): CARD_ACCENTS, CardSubject(), colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "student-examples/[id]/index.js"
Cohesion: 0.83
Nodes (3): getArray(), parseMaybeJson(), StudentExampleDetailPage()

### Community 81 - "subscriptionPlans/index.js"
Cohesion: 0.15
Nodes (7): categoryColors, SubscriptionPlansGrid(), commonAPI, subscriptionAPI, SubscriptionPlans(), openCreateModal(), resetForm()

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

### Community 90 - "BuyBookModal.jsx"
Cohesion: 0.33
Nodes (6): BookCard(), BuyBookModal(), nf(), PayPill(), purchaseAPI, toAbs()

### Community 91 - "HomeRemindersCard.jsx"
Cohesion: 0.33
Nodes (5): HomeRemindersCard(), REMINDER_STYLES, mockReminders, mockStreak, TODO: static placeholder data — swap for real API responses once the backend…

### Community 95 - "i18n/index.js"
Cohesion: 0.33
Nodes (5): i18next, i18next-browser-languagedetector, src_services_i18n_translations_en, src_services_i18n_translations_ru, src_services_i18n_translations_uz

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

### Community 101 - "StudentTable.jsx"
Cohesion: 0.08
Nodes (22): ag-grid-community, ag-grid-react, clsx, react-paginate, GridExample(), Pagination(), SearchInput(), SelectBox() (+14 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 107 - "Referrals.jsx"
Cohesion: 0.12
Nodes (16): @heroicons/react, EditIcon(), useDeleteQuery(), CouponCard(), CouponsList(), EmptyCuponState(), fixLatex(), MathText() (+8 more)

### Community 108 - "Landing.jsx"
Cohesion: 0.11
Nodes (13): Benefits(), Courses(), Leadership(), leadershipApi, LeadershipSlider(), mathJaxConfig, PowerfulDozens(), Pricing() (+5 more)

### Community 109 - "better-react-mathjax"
Cohesion: 0.24
Nodes (8): better-react-mathjax, html-react-parser, cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), parseHtml(), StudentExampleQuestionList()

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 116 - "lucide-react"
Cohesion: 0.13
Nodes (13): lucide-react, ProgressChart(), GROUPS_PATH, TEACHER_GROUP_KEYS, TeacherGroupDetail(), TeacherGroups(), ConfirmModal(), averageColorFor() (+5 more)

### Community 117 - "TutorHome.jsx"
Cohesion: 0.12
Nodes (15): NavbarBackTeacher(), NavbarProfile(), Friends(), GROUP_ICON_BG, progressColor(), TutorGroupsCard(), AVATAR_COLORS, initialsOf() (+7 more)

### Community 118 - "history.js"
Cohesion: 0.15
Nodes (9): recharts, BattleLevelBadge(), LEVEL_COLORS, BattleResultModal(), RESULT_META, BattleTimer(), BattleVsHeader(), RESULT_COLOR (+1 more)

### Community 124 - "api/index.js"
Cohesion: 0.08
Nodes (24): axios, @ckeditor/ckeditor5-react, CloseIcon(), QuestionCountIcon(), VideoPlayer(), config, useDeleteQuestion(), putRequest() (+16 more)

### Community 126 - "BattleSetupForm.jsx"
Cohesion: 0.18
Nodes (10): src_assets_images_battle_qoida, BattleRatingWidget(), BattleRulesCard(), BattleSetupForm(), getSubjectIcon(), GRADE_ICON_STYLES, QUESTION_COUNT_OPTIONS, SECONDS_OPTIONS (+2 more)

### Community 127 - "StudentDetails.jsx"
Cohesion: 0.16
Nodes (8): EyeIcon(), ChildNotFoundState(), NoActivityState(), ChildDetail(), StudentSubjectsList(), getRoleForAPI(), StudentDetails(), Index()

### Community 128 - "echarts-for-react"
Cohesion: 0.13
Nodes (6): echarts-for-react, days, heatmapData, hours, DONUT_COLORS, PlansRevenueChart()

### Community 129 - "test-calc/index.js"
Cohesion: 0.19
Nodes (6): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, MathKeyboard

### Community 165 - "footer/index.jsx"
Cohesion: 0.22
Nodes (5): InstagramIcon(), TelegramIcon(), YoutubeIcon(), AuthLanding(), BannerHeader()

### Community 166 - "wrapAnswer.js"
Cohesion: 0.33
Nodes (12): RecommendQuestions(), SubjectQuestions(), addWrapper(), isSimpleNumber(), isWrapped(), needsWrapper(), normalizeAnswerForBackend(), normalizeLatex() (+4 more)

### Community 167 - "ReviewCarousel.js"
Cohesion: 0.20
Nodes (6): src_assets_images_profile_user_1, src_assets_images_profile_user_2, src_assets_images_profile_user_3, src_assets_images_profile_user_4, src_assets_images_profile_user_5, Reviews

### Community 168 - "ProductsExchange.jsx"
Cohesion: 0.28
Nodes (5): EmptyState(), src_modules_teacher_products_components_index_emptystate, src_modules_teacher_products_components_index_loadingstate, LoadingState(), ProductsExchange()

### Community 169 - "Calculator.jsx"
Cohesion: 0.38
Nodes (4): Calculator(), availableMathSymbols, MathSymbols(), symbolsList

### Community 170 - "SubjectsBanner.jsx"
Cohesion: 0.50
Nodes (3): src_assets_images_backgrounds_subject_bacground, QUICK_LINKS, SubjectsBanner()

## Knowledge Gaps
- **290 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `paths` (+285 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 764 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **81 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `react-i18next`, `useGetQuery`, `test-calc/index.js`, `SomTransfer.jsx`, `echarts-for-react`, `next-auth`, `useKeyboardShortcut`, `@mui/material`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `ref_prop_types`, `ParentHome.jsx`, `BattleArena.jsx`, `package.json`, `react-hot-toast`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `Auth.js`, `next`, `@tanstack/react-query`, `@tabler/icons`, `PricingContent.jsx`, `@heroui/react`, `StudentHome.jsx`, `student/my-study/index.js`, `HpHeader.js`, `Sidebar.jsx`, `footer/index.jsx`, `GameRenderer.js`, `ReviewCarousel.js`, `request`, `Calculator.jsx`, `DozensCarousel.js`, `roomTypeProvider.js`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `ProductsExchange.jsx`, `MatematikaLanding.jsx`, `TutorHomeGreeting.jsx`, `student/subjects/[id]/index.js`, `react-dom`, `QuestionForm.jsx`, `Theme.js`, `KpiDashboard.jsx`, `student/chat/index.js`, `menulist.js`, `@dnd-kit/sortable`, `dashboard-nav/index.jsx`, `TutorProfile.jsx`, `store/index.js`, `ratings/index.js`, `form/index.js`, `PaymentMethods.js`, `uzbekistan-map/index.jsx`, `dashboard/index.jsx`, `footer/index.js`, `Features.js`, `CardSubject.jsx`, `student-examples/[id]/index.js`, `subscriptionPlans/index.js`, `PanelCard.jsx`, `BuyBookModal.jsx`, `process/index.js`, `TopicDetail.jsx`, `StudentTable.jsx`, `Referrals.jsx`, `Landing.jsx`, `better-react-mathjax`, `lucide-react`, `TutorHome.jsx`, `history.js`, `api/index.js`, `BattleSetupForm.jsx`, `StudentDetails.jsx`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **Why does `react-i18next` connect `react-i18next` to `echarts-for-react`, `useGetQuery`, `SomTransfer.jsx`, `react`, `next-auth`, `useKeyboardShortcut`, `@mui/material`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `ParentHome.jsx`, `BattleArena.jsx`, `package.json`, `react-hot-toast`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `Auth.js`, `next`, `@tanstack/react-query`, `PricingContent.jsx`, `@heroui/react`, `StudentHome.jsx`, `student/my-study/index.js`, `HpHeader.js`, `Sidebar.jsx`, `footer/index.jsx`, `request`, `ProductsExchange.jsx`, `DozensCarousel.js`, `SubjectsBanner.jsx`, `framer-motion`, `StatisticsHero.jsx`, `TutorHomeGreeting.jsx`, `student/subjects/[id]/index.js`, `MatematikaLanding.jsx`, `TutorProfileInfo.jsx`, `[student_id].js`, `react-dom`, `QuestionForm.jsx`, `student/chat/index.js`, `menulist.js`, `dashboard-nav/index.jsx`, `TutorProfile.jsx`, `store/index.js`, `ratings/index.js`, `Features.js`, `CardSubject.jsx`, `student-examples/[id]/index.js`, `subscriptionPlans/index.js`, `PanelCard.jsx`, `BuyBookModal.jsx`, `HomeRemindersCard.jsx`, `TutorStatsGrid.jsx`, `i18n/index.js`, `TutorProfileHero.jsx`, `TopicDetail.jsx`, `MyPurchasedBooks.jsx`, `TutorProfileActivity.jsx`, `StudentTable.jsx`, `Referrals.jsx`, `Landing.jsx`, `better-react-mathjax`, `lucide-react`, `TutorHome.jsx`, `history.js`, `api/index.js`, `TutorPromoCard.jsx`, `BattleSetupForm.jsx`, `StudentDetails.jsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `react-i18next`, `useGetQuery`, `test-calc/index.js`, `react`, `next-auth`, `useKeyboardShortcut`, `@mui/material`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `ref_prop_types`, `ParentHome.jsx`, `BattleArena.jsx`, `package.json`, `react-hot-toast`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `Auth.js`, `@tanstack/react-query`, `@tabler/icons`, `PricingContent.jsx`, `@heroui/react`, `StudentHome.jsx`, `student/my-study/index.js`, `HpHeader.js`, `Sidebar.jsx`, `footer/index.jsx`, `request`, `DozensCarousel.js`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `student/subjects/[id]/index.js`, `MatematikaLanding.jsx`, `menuConfig.js`, `student/chat/index.js`, `menulist.js`, `dashboard-nav/index.jsx`, `TutorProfile.jsx`, `store/index.js`, `ratings/index.js`, `form/index.js`, `PaymentMethods.js`, `dashboard/index.jsx`, `footer/index.js`, `Features.js`, `student-examples/[id]/index.js`, `app-store-buttons/index.jsx`, `BuyBookModal.jsx`, `process/index.js`, `TopicDetail.jsx`, `TutorProfileActivity.jsx`, `StudentTable.jsx`, `Landing.jsx`, `lucide-react`, `TutorHome.jsx`, `history.js`, `api/index.js`, `StudentDetails.jsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _290 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react-i18next` be split into smaller, more focused modules?**
  _Cohesion score 0.060527825588066554 - nodes in this community are weakly interconnected._
- **Should `useGetQuery` be split into smaller, more focused modules?**
  _Cohesion score 0.0671892497200448 - nodes in this community are weakly interconnected._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06101231190150479 - nodes in this community are weakly interconnected._