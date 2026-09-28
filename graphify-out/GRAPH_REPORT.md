# Graph Report - iqmath_student  (2026-09-28)

## Corpus Check
- 672 files · ~3,378,995 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .otf 18, .css 6, (none) 3)

## Summary
- 2677 nodes · 8296 edges · 163 communities (83 shown, 80 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3dcb8840`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react-i18next
- CouponsList.jsx
- h
- QuestionForm.jsx
- dependencies
- react
- useGetQuery
- language/index.jsx
- Theme.js
- ChatBoxModule.js
- SubjectQuestions.jsx
- T
- @mui/material
- @heroui/react
- history.js
- package.json
- s
- next
- PurchasedProducts.jsx
- c
- tex-mml-svg.js
- a
- TutorGroupDetail.jsx
- usePostQuery
- StudentHome.jsx
- L
- _app.js
- @tabler/icons
- PricingContent.jsx
- BattleArena.jsx
- makeBranchNode
- HomeRemindersCard.jsx
- student/my-study/index.js
- gamesData.js
- HpHeader.js
- student/coins/index.js
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
- BattleSetupForm.jsx
- next-auth
- KpiDashboard.jsx
- student/chat/index.js
- .merge
- n
- r
- StudentProfile.jsx
- ParentProfile.jsx
- @dnd-kit/sortable
- student/individual/index.js
- TutorProfile.jsx
- .setAttribute
- TutorStatsGrid.jsx
- ratings/index.js
- form/index.js
- PaymentMethods.js
- uzbekistan-map/index.jsx
- .getChildren
- .add
- footer/index.js
- Landing.jsx
- useImageAccentColor.js
- SubscriptionPlans
- eslint.config.mjs
- PanelCard.jsx
- powerful-dozens/index.js
- ckeditor.js
- .defineRuleFromStrings
- .getValue
- defend-focus/index.js
- src_assets_images_battle_qoida
- TutorProfileHero.jsx
- .generateSpeech
- MyPurchasedBooks.jsx
- TutorProfileActivity.jsx
- react-hot-toast
- devDependencies
- scripts
- video-player/index.jsx
- pauseValue
- StudentExampleDetailLayout.jsx
- Editing this README
- TeacherGroupDetail.jsx
- TutorGroupsCard.jsx
- middleware.js
- compilerOptions
- next.config.mjs
- button/index.jsx
- TutorPromoCard.jsx
- react-icons
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- footer/index.jsx
- MathSymbols.jsx
- DiagnosticSubjects.jsx
- @ckeditor/ckeditor5-react
- TopicDetail

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
- `SubjectsPage()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/pages/dashboard/student/subjects/[id]/index.js → src/hooks/api/useGetQuery.js
- `SendToMentorModal()` --calls--> `usePostQuery()`  [EXTRACTED]
  src/modules/student/subjects/components/modal/SendToMentorModal.jsx → src/hooks/api/usePostQuery.js
- `DashboardNav()` --calls--> `useRoleDetection()`  [EXTRACTED]
  src/components/dashboard/dashboard-nav/index.jsx → src/hooks/useRoleDetection.js
- `DashboardNav()` --calls--> `useAuthTabStore`  [EXTRACTED]
  src/components/dashboard/dashboard-nav/index.jsx → src/store/authTabStore.js
- `UserAgreement()` --calls--> `useGetQuery()`  [EXTRACTED]
  src/components/oferta/index.jsx → src/hooks/api/useGetQuery.js

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (163 total, 80 thin omitted)

### Community 0 - "react-i18next"
Cohesion: 0.06
Nodes (19): react-i18next, BaseBreadcrumbs(), HeaderTitle(), SearchInput(), SelectBox(), StudentBreadcrumbs(), LayoutAdmin(), Main() (+11 more)

### Community 1 - "CouponsList.jsx"
Cohesion: 0.11
Nodes (18): @heroicons/react, useDeleteQuery(), useSidebarCount(), getMenuItemClasses(), getMenuItems(), MenuType, NavbarBackTeacher(), HIDDEN_MENU_KEYS_WHEN_INACTIVE (+10 more)

### Community 3 - "QuestionForm.jsx"
Cohesion: 0.17
Nodes (9): ChoiceAnswerInput(), CompositeAnswerInput(), ImageChoiceInput(), QuestionForm(), QuestionModal(), QuestionTypeSelect(), editorConfig, RichTextEditor() (+1 more)

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+66 more)

### Community 5 - "react"
Cohesion: 0.03
Nodes (23): EyeIcon(), echarts-for-react, react, ref_react_router, src_assets_images_logos_uzumlogo, src_assets_images_logos_uzumnasiya, InputText, RoomContext (+15 more)

### Community 6 - "useGetQuery"
Cohesion: 0.05
Nodes (55): ref_constants, src_assets_images_mentor_background, MainContentHead(), Header(), navLinks, PhoneIcon(), UserAgreement(), ProfileDetails() (+47 more)

### Community 7 - "language/index.jsx"
Cohesion: 0.12
Nodes (22): LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), NavbarLangue(), LayoutQuestion(), DiagnosticQuestions(), RecommendQuestions() (+14 more)

### Community 8 - "Theme.js"
Cohesion: 0.07
Nodes (33): src_assets_images_about_iqmath, src_assets_images_about_iqmath_banner_4k, Banner(), FEATURES, KeyMetric(), BannerFaq(), FAQ(), StyledAccordion (+25 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.06
Nodes (28): ChatBoxModule(), ChatHeader(), ChatsList(), formatDate(), CloseModal(), EmptyMessage(), IndependentResultCard(), MessageBubble() (+20 more)

### Community 10 - "SubjectQuestions.jsx"
Cohesion: 0.20
Nodes (17): better-react-mathjax, html-react-parser, react-mathquill, ActionCalculator(), ActionInfo(), ActionSolution(), Calculator(), ExamAnswerChoice() (+9 more)

### Community 12 - "@mui/material"
Cohesion: 0.05
Nodes (11): @mui/material, ref_prop_types, src_assets_images_frontend_pages_homepage_feature_apps, src_assets_images_frontend_pages_icons_icon_check, src_assets_images_frontend_pages_icons_icon_close, src_assets_images_svgs_icon_briefcase, src_assets_images_svgs_icon_favorites, src_assets_images_svgs_icon_speech_bubble (+3 more)

### Community 13 - "@heroui/react"
Cohesion: 0.11
Nodes (12): @heroui/react, SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), ParentChangePasswordModal(), ParentEditInfoModal(), CreateReferalModal(), DiagnosticResultModal() (+4 more)

### Community 14 - "history.js"
Cohesion: 0.17
Nodes (10): recharts, BattleChat(), AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial(), BattleSearching(), formatElapsed() (+2 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (37): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+29 more)

### Community 16 - "s"
Cohesion: 0.07
Nodes (3): s(), visit(), x()

### Community 17 - "next"
Cohesion: 0.12
Nodes (23): axios, lodash, next, QuestionCountIcon(), RightIcon(), TrashIcon(), ImageUploader(), Input() (+15 more)

### Community 18 - "PurchasedProducts.jsx"
Cohesion: 0.07
Nodes (23): dayjs, usePurchasedProducts(), EmptyState(), ErrorState(), src_modules_student_products_components_index_emptystate, src_modules_student_products_components_index_errorstate, src_modules_student_products_components_index_productgrid, LoadingState() (+15 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.07
Nodes (14): annotate(), applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_() (+6 more)

### Community 22 - "TutorGroupDetail.jsx"
Cohesion: 0.24
Nodes (12): UngroupedStudentsModal(), AddStudentsModal(), GroupStudentsTable(), InviteStudentModal(), Modal(), MoveStudentsModal(), PendingInvitationsList(), TutorGroupDetail() (+4 more)

### Community 23 - "usePostQuery"
Cohesion: 0.12
Nodes (28): react-hook-form, InputPassword, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone, SelectClass(), SimpleLoader() (+20 more)

### Community 24 - "StudentHome.jsx"
Cohesion: 0.15
Nodes (11): buildMonthGrid(), formatDDMMYYYY(), HomeCalendarCard(), MONTH_LABELS_UZ, WEEKDAYS_UZ, HomeHero(), HomeRecentActivity(), HomeStatsGrid() (+3 more)

### Community 26 - "_app.js"
Cohesion: 0.15
Nodes (10): i18next, i18next-browser-languagedetector, src_assets_styles_globals, reactQueryClient, UserProfileContext, UserProfileProvider(), src_services_i18n_translations_en, src_services_i18n_translations_ru (+2 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.08
Nodes (13): ref_react_syntax_highlighter, @tabler/icons, src_assets_images_frontend_pages_homepage_accordian1, src_assets_images_frontend_pages_homepage_notification_left, src_assets_images_frontend_pages_homepage_notification_right, src_assets_images_frontend_pages_homepage_notification_top_right, StyledAccordian, StyledAccordian (+5 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.16
Nodes (17): @mui/icons-material, src_data_gamesdata_mentalgames, safekidSeeds, Auth(), closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection() (+9 more)

### Community 29 - "BattleArena.jsx"
Cohesion: 0.11
Nodes (14): BattleArena(), BattleLevelBadge(), LEVEL_COLORS, BattleQuestionCard(), DEFAULT_LETTER_STYLE, LETTER_STYLES, MJ_CONFIG, BattleRatingWidget() (+6 more)

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

### Community 35 - "student/coins/index.js"
Cohesion: 0.22
Nodes (9): NavbarCoins(), NavbarPoints(), NavbarSum(), CoinConvert(), RATES, Products(), Index(), src_store_index_usescorestore (+1 more)

### Community 37 - "GameRenderer.js"
Cohesion: 0.13
Nodes (15): BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle(), values (+7 more)

### Community 38 - "PricingModal.jsx"
Cohesion: 0.33
Nodes (9): CouponSection(), src_modules_student_payment_components_index_couponsection, src_modules_student_payment_components_index_modalheader, src_modules_student_payment_components_index_plangrid, ModalHeader(), PlanGrid(), PricingCouponModal(), PricingModal() (+1 more)

### Community 42 - "ReviewCarousel.js"
Cohesion: 0.10
Nodes (14): react-slick, slick-carousel, src_assets_images_landingpage_apps_app_chat, src_assets_images_landingpage_apps_app_email, src_assets_images_landingpage_demos_demo_dark, src_assets_images_landingpage_demos_demo_horizontal, src_assets_images_landingpage_demos_demo_main, src_assets_images_landingpage_demos_demo_rtl (+6 more)

### Community 44 - "framer-motion"
Cohesion: 0.10
Nodes (16): framer-motion, SelectRole(), InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks (+8 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.10
Nodes (19): src_assets_images_frontend_pages_icons_icon_chart, src_assets_images_frontend_pages_icons_icon_color, src_assets_images_frontend_pages_icons_icon_components, src_assets_images_frontend_pages_icons_icon_customize, src_assets_images_frontend_pages_icons_icon_framework, src_assets_images_frontend_pages_icons_icon_icons, src_assets_images_frontend_pages_icons_icon_pages, src_assets_images_frontend_pages_icons_icon_responsive (+11 more)

### Community 46 - "[student_id].js"
Cohesion: 0.17
Nodes (17): Eye(), EyeOff(), buildApiParams(), DailyTasksPage(), formatScore(), getCurrentWeek(), getDaysInRange(), getLocalizedName() (+9 more)

### Community 47 - ".indexOf"
Cohesion: 0.35
Nodes (9): b(), d(), f(), g(), e(), m(), p(), e() (+1 more)

### Community 48 - "MatematikaLanding.jsx"
Cohesion: 0.13
Nodes (8): BENEFIT_ICONS, formatUzPhone(), HERO_SLIDES, LeadForm(), SEGMENT_ICONS, STATS, MatematikaLanding, MatematikaLanding

### Community 50 - "lucide-react"
Cohesion: 0.06
Nodes (18): lucide-react, src_assets_images_backgrounds_subject_bacground, src_assets_parent_background, AVATAR_COLORS, ParentChildrenCard(), ParentHomeHero(), ParentStatsGrid(), ParentProfileInfoCard() (+10 more)

### Community 51 - ".leaf_"
Cohesion: 0.16
Nodes (3): makeContentNode(), makeLeafNode(), makeMultipleContentNodes()

### Community 52 - "menuConfig.js"
Cohesion: 0.09
Nodes (17): next-themes, DashboardNav(), MainContent(), MenuSection(), ProfileSection(), Sidebar(), CoinsIcon(), DiagnosticsIcon() (+9 more)

### Community 53 - "BattleSetupForm.jsx"
Cohesion: 0.24
Nodes (7): BattleSetupForm(), getSubjectIcon(), GRADE_ICON_STYLES, QUESTION_COUNT_OPTIONS, SECONDS_OPTIONS, SUBJECT_ICON_RULES, BattleStatsCard()

### Community 55 - "next-auth"
Cohesion: 0.08
Nodes (24): ref, ag-grid-community, ag-grid-react, clsx, next-auth, SpinnerIcon(), ContentLoader(), ActivityTable() (+16 more)

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
Cohesion: 0.19
Nodes (10): StudentProfile(), CoinsHistoryTab(), CoinsTab(), CouponsTab(), FinesTab(), ProfileInfoTab(), ReferralTab(), TransferTab() (+2 more)

### Community 62 - "ParentProfile.jsx"
Cohesion: 0.36
Nodes (3): ParentProfileHero(), ParentProfileSecurityCard(), ParentProfile()

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.27
Nodes (5): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, SortableItem(), DragIcon()

### Community 64 - "student/individual/index.js"
Cohesion: 0.40
Nodes (3): Individual(), rowData, rowDataUz

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.24
Nodes (6): TutorProfileInfo(), TutorProfileQuickLinks(), TutorProfileStats(), formatPhone(), formatRegisteredAt(), TutorProfile()

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

### Community 77 - "footer/index.js"
Cohesion: 0.22
Nodes (5): src_assets_images_frontend_pages_icons_icon_facebook, src_assets_images_frontend_pages_icons_icon_instagram, src_assets_images_frontend_pages_icons_icon_twitter, src_assets_images_logos_logoicon, footerLinks

### Community 78 - "Landing.jsx"
Cohesion: 0.08
Nodes (19): swiper, Benefits(), Courses(), HomePage(), newsApi, cardStyle, Features(), images (+11 more)

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 81 - "SubscriptionPlans"
Cohesion: 0.25
Nodes (3): SubscriptionPlans(), openCreateModal(), resetForm()

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (7): compat, __dirname, eslintConfig, __filename, ref_eslint_eslintrc, ref_path, ref_url

### Community 84 - "PanelCard.jsx"
Cohesion: 0.25
Nodes (3): react-circular-progressbar, ACCENTS, PanelCard()

### Community 85 - "powerful-dozens/index.js"
Cohesion: 0.29
Nodes (5): AppStoreButtons(), APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH, PowerfulDozens()

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 90 - "defend-focus/index.js"
Cohesion: 0.33
Nodes (4): NEWS, newsApi, newsApi, NewsSlider()

### Community 97 - "TutorProfileHero.jsx"
Cohesion: 0.40
Nodes (4): src_assets_images_teacher_home_page, TutorHomeHero(), initialsOf(), TutorProfileHero()

### Community 99 - "MyPurchasedBooks.jsx"
Cohesion: 0.40
Nodes (3): MyPurchasedBooks(), STATUS_CONFIG, toAbs()

### Community 100 - "TutorProfileActivity.jsx"
Cohesion: 0.40
Nodes (4): ACTIVITY_META, TutorProfileActivity(), mockProfileActivity, TODO: statik ma'lumot — backendda tutor uchun "faoliyat tarixi" (activity feed)

### Community 101 - "react-hot-toast"
Cohesion: 0.06
Nodes (29): react-hot-toast, @tanstack/react-query, useDeleteQuestion(), CouponModal(), BuyBookModal(), nf(), PayPill(), purchaseAPI (+21 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 104 - "video-player/index.jsx"
Cohesion: 0.50
Nodes (3): react-player, CloseIcon(), ReactPlayer

### Community 109 - "StudentExampleDetailLayout.jsx"
Cohesion: 0.39
Nodes (6): cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), parseHtml(), StudentExampleQuestionList()

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 113 - "TeacherGroupDetail.jsx"
Cohesion: 0.13
Nodes (14): GROUPS_PATH, TEACHER_GROUP_KEYS, TeacherGroupDetail(), TeacherGroups(), ConfirmModal(), averageColorFor(), CARD_COLORS, GroupCard() (+6 more)

### Community 117 - "TutorGroupsCard.jsx"
Cohesion: 0.67
Nodes (3): GROUP_ICON_BG, progressColor(), TutorGroupsCard()

### Community 124 - "button/index.jsx"
Cohesion: 0.13
Nodes (13): Button(), EditIcon(), ConfirmPurchaseModal(), PurchaseSuccessModal(), AutoCompleteSelect(), CreateParentModal(), ParentsManagement(), fixLatex() (+5 more)

### Community 127 - "react-icons"
Cohesion: 0.09
Nodes (15): react-dom, react-icons, buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal() (+7 more)

### Community 129 - "test-calc/index.js"
Cohesion: 0.19
Nodes (6): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, MathKeyboard

### Community 165 - "footer/index.jsx"
Cohesion: 0.22
Nodes (6): Footer(), InstagramIcon(), TelegramIcon(), YoutubeIcon(), AuthLanding(), BannerHeader()

### Community 169 - "MathSymbols.jsx"
Cohesion: 0.50
Nodes (3): availableMathSymbols, MathSymbols(), symbolsList

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.06
Nodes (33): zustand, Brand(), MainWrapper(), NavbarTitle(), Sidebar(), SidebarFooter(), SidebarLogo(), CardDiagnostic() (+25 more)

### Community 173 - "@ckeditor/ckeditor5-react"
Cohesion: 0.67
Nodes (3): @ckeditor/ckeditor5-react, CKEditor, CKEditor

## Knowledge Gaps
- **293 isolated node(s):** `__filename`, `__dirname`, `compat`, `eslintConfig`, `paths` (+288 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 773 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `react-i18next`, `test-calc/index.js`, `CouponsList.jsx`, `QuestionForm.jsx`, `useGetQuery`, `language/index.jsx`, `Theme.js`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `@mui/material`, `@heroui/react`, `history.js`, `package.json`, `next`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `usePostQuery`, `StudentHome.jsx`, `_app.js`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `student/my-study/index.js`, `gamesData.js`, `HpHeader.js`, `student/coins/index.js`, `footer/index.jsx`, `GameRenderer.js`, `PricingModal.jsx`, `MathSymbols.jsx`, `DiagnosticSubjects.jsx`, `ReviewCarousel.js`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `MatematikaLanding.jsx`, `lucide-react`, `menuConfig.js`, `BattleSetupForm.jsx`, `next-auth`, `KpiDashboard.jsx`, `student/chat/index.js`, `StudentProfile.jsx`, `ParentProfile.jsx`, `@dnd-kit/sortable`, `student/individual/index.js`, `TutorProfile.jsx`, `ratings/index.js`, `form/index.js`, `PaymentMethods.js`, `uzbekistan-map/index.jsx`, `footer/index.js`, `Landing.jsx`, `useImageAccentColor.js`, `PanelCard.jsx`, `defend-focus/index.js`, `react-hot-toast`, `video-player/index.jsx`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `button/index.jsx`, `react-icons`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `react-i18next` connect `react-i18next` to `CouponsList.jsx`, `QuestionForm.jsx`, `react`, `useGetQuery`, `language/index.jsx`, `Theme.js`, `ChatBoxModule.js`, `SubjectQuestions.jsx`, `@heroui/react`, `history.js`, `package.json`, `next`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `usePostQuery`, `StudentHome.jsx`, `_app.js`, `PricingContent.jsx`, `BattleArena.jsx`, `HomeRemindersCard.jsx`, `student/my-study/index.js`, `gamesData.js`, `HpHeader.js`, `student/coins/index.js`, `footer/index.jsx`, `PricingModal.jsx`, `ReviewCarousel.js`, `DiagnosticSubjects.jsx`, `framer-motion`, `[student_id].js`, `MatematikaLanding.jsx`, `lucide-react`, `menuConfig.js`, `BattleSetupForm.jsx`, `next-auth`, `KpiDashboard.jsx`, `student/chat/index.js`, `StudentProfile.jsx`, `ParentProfile.jsx`, `student/individual/index.js`, `TutorProfile.jsx`, `TutorStatsGrid.jsx`, `ratings/index.js`, `Landing.jsx`, `PanelCard.jsx`, `powerful-dozens/index.js`, `defend-focus/index.js`, `TutorProfileHero.jsx`, `MyPurchasedBooks.jsx`, `TutorProfileActivity.jsx`, `react-hot-toast`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `TutorGroupsCard.jsx`, `button/index.jsx`, `TutorPromoCard.jsx`, `react-icons`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `react-i18next`, `CouponsList.jsx`, `test-calc/index.js`, `react`, `useGetQuery`, `language/index.jsx`, `Theme.js`, `SubjectQuestions.jsx`, `@mui/material`, `@heroui/react`, `history.js`, `package.json`, `PurchasedProducts.jsx`, `TutorGroupDetail.jsx`, `usePostQuery`, `StudentHome.jsx`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `student/my-study/index.js`, `HpHeader.js`, `student/coins/index.js`, `footer/index.jsx`, `DiagnosticSubjects.jsx`, `ReviewCarousel.js`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `MatematikaLanding.jsx`, `lucide-react`, `menuConfig.js`, `next-auth`, `student/chat/index.js`, `student/individual/index.js`, `TutorProfile.jsx`, `ratings/index.js`, `_document.js`, `form/index.js`, `PaymentMethods.js`, `footer/index.js`, `Landing.jsx`, `yandex.js`, `powerful-dozens/index.js`, `defend-focus/index.js`, `TutorProfileActivity.jsx`, `react-hot-toast`, `video-player/index.jsx`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `TutorGroupsCard.jsx`, `middleware.js`, `button/index.jsx`, `react-icons`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `compat` to the rest of the system?**
  _293 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react-i18next` be split into smaller, more focused modules?**
  _Cohesion score 0.05637840420449116 - nodes in this community are weakly interconnected._
- **Should `CouponsList.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11264367816091954 - nodes in this community are weakly interconnected._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06101231190150479 - nodes in this community are weakly interconnected._