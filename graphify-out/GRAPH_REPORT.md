# Graph Report - iqmath_student  (2026-11-06)

## Corpus Check
- 791 files · ~4,157,022 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 37 file(s) not represented in the graph (top: .otf 18, .css 6, .glb 4)

## Summary
- 3368 nodes · 10158 edges · 147 communities (89 shown, 58 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d090bd6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LayoutAdmin
- Referrals.jsx
- h
- QuestionForm.jsx
- dependencies
- react
- useGetQuery
- DiagnosticQuestions.jsx
- Theme.js
- ChatBoxModule.js
- QuestionWorkspace.jsx
- T
- @mui/material
- @heroui/react
- SiteStatistics.jsx
- package.json
- s
- usePostQuery
- ProductCard.jsx
- c
- tex-mml-svg.js
- a
- LigaDashboard.jsx
- Auth.js
- HomeStatsGrid.jsx
- L
- _app.js
- @tabler/icons
- PricingContent.jsx
- BattleArena.jsx
- role-landing/shared.jsx
- StudentTable.jsx
- student/my-study/index.js
- gamesData.js
- next
- store/index.js
- i
- GameRenderer.js
- DiagnosticMistakes.jsx
- ChildOverview.jsx
- o
- Q
- ReviewCarousel.js
- LigaHome.jsx
- framer-motion
- exceptional-feature/index.js
- [student_id].js
- BattleSetupForm.jsx
- BottomSections.jsx
- LanguageDropdown
- lucide-react
- NewsSingle.jsx
- menuConfig.js
- student/chat/index.js
- SwitchToChildButton.jsx
- next-auth
- dashboard/index.jsx
- react-i18next
- MyChildren.jsx
- n
- r
- StudentProfile.jsx
- ParentProfileInfoCard.jsx
- @dnd-kit/sortable
- HpHeader.js
- TutorProfile.jsx
- MistakeQuestionCard.jsx
- AuthMascot.jsx
- form/index.js
- RoleChooser.jsx
- SomTransfer.jsx
- Features.js
- uzbekistan-map/index.jsx
- BuyBookModal.jsx
- dashboard-nav/index.jsx
- key-metric/index.js
- [...nextauth].js
- Landing.jsx
- useImageAccentColor.js
- student/individual/index.js
- SubscriptionPromoModal.jsx
- eslint.config.mjs
- LeadershipSlider.js
- i18n/index.js
- ParentQr.jsx
- ckeditor.js
- RobotWalker.jsx
- react-circular-progressbar
- SubjectsBanner.jsx
- AGENTS.md
- CoinsTab.jsx
- ParentQuickActions.jsx
- ParentStatsGrid.jsx
- ParentProfileQuickActions.jsx
- MentorClosedChatsStats.jsx
- .singletonFocus
- MyPurchasedBooks.jsx
- url.js
- devDependencies
- scripts
- StudentExampleDetailLayout.jsx
- Editing this README
- TeacherGroupDetail.jsx
- compilerOptions
- next.config.mjs
- SubjectOld.jsx
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- header/index.jsx
- DiagnosticSubjects.jsx
- ParentConnect.jsx
- student/subjects/[id]/index.js

## God Nodes (most connected - your core abstractions)
1. `react` - 449 edges
2. `react-i18next` - 380 edges
3. `lucide-react` - 202 edges
4. `next` - 188 edges
5. `useGetQuery()` - 182 edges
6. `LayoutAdmin()` - 178 edges
7. `a()` - 141 edges
8. `URLS` - 119 edges
9. `T()` - 100 edges
10. `i()` - 100 edges

## Surprising Connections (you probably didn't know these)
- `Index()` --calls--> `EyeIcon()`  [EXTRACTED]
  src/pages/dashboard/parent/results/[id]/index.jsx → public/icons/eyeIcon.jsx
- `Category()` --calls--> `LayoutAdmin()`  [EXTRACTED]
  src/pages/dashboard/prices/category/index.js → src/layout/LayoutAdmin.jsx
- `StudentProfile()` --indirect_call--> `CoinsTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/CoinsTab.jsx
- `StudentProfile()` --indirect_call--> `TransferTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/TransferTab.jsx
- `DeleteAccountCard()` --calls--> `DeleteAccountModal()`  [EXTRACTED]
  src/components/account/DeleteAccountCard.jsx → src/components/account/DeleteAccountModal.jsx

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (147 total, 58 thin omitted)

### Community 0 - "LayoutAdmin"
Cohesion: 0.07
Nodes (49): react-i18next, HeaderTitle(), OnlinePing(), LayoutAdmin(), CoinConvert(), RATES, StudentInvitationsModal(), TrialSettings() (+41 more)

### Community 1 - "Referrals.jsx"
Cohesion: 0.20
Nodes (11): @heroicons/react, useDeleteQuery(), CouponCard(), CouponsList(), EmptyCuponState(), CreateReferralModal(), EditReferralModal(), EmptyState() (+3 more)

### Community 2 - "h"
Cohesion: 0.07
Nodes (11): b(), d(), e(), f(), g(), h(), e(), m() (+3 more)

### Community 3 - "QuestionForm.jsx"
Cohesion: 0.22
Nodes (9): ChoiceAnswerInput(), CompositeAnswerInput(), ImageChoiceInput(), QuestionForm(), QuestionModal(), QuestionTypeSelect(), editorConfig, RichTextEditor() (+1 more)

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (76): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+68 more)

### Community 5 - "react"
Cohesion: 0.03
Nodes (14): echarts-for-react, react, RoomContext, TopicContext, MultiplicationModal(), numbers, NavbarMultiplication(), days (+6 more)

### Community 6 - "useGetQuery"
Cohesion: 0.07
Nodes (39): ag-grid-community, ag-grid-react, next-auth, UserAgreement(), ProfileDetails(), TopicDropdown(), KEYS, useGetQuery() (+31 more)

### Community 7 - "DiagnosticQuestions.jsx"
Cohesion: 0.16
Nodes (21): ModalLevel(), readStart(), removeStart(), usePersistentTimer(), writeStart(), DiagnosticQuestions(), DiagnosticTest(), SubjectQuestions() (+13 more)

### Community 8 - "Theme.js"
Cohesion: 0.11
Nodes (29): Footer(), Banner(), AuthLanding(), ContactPage(), BannerFaq(), ScrollToTop(), LayoutHome(), components() (+21 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.08
Nodes (26): ChatBoxModule(), ChatHeader(), ROLE_LABELS, ChatAvatar(), ChatsList(), formatDate(), CloseModal(), EmptyMessage() (+18 more)

### Community 10 - "QuestionWorkspace.jsx"
Cohesion: 0.16
Nodes (15): react-mathquill, Calculator(), compositeMathStyle, ExamAnswerComposite(), ExamAnswerText(), textMathStyle, mathConfig, plainLength() (+7 more)

### Community 12 - "@mui/material"
Cohesion: 0.05
Nodes (4): @mui/material, BaseCard(), keys, Licenses

### Community 13 - "@heroui/react"
Cohesion: 0.17
Nodes (12): @heroui/react, SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), CreateReferalModal(), DiagnosticResultModal(), SendToMentorModal(), SubscriptionExitPromo() (+4 more)

### Community 14 - "SiteStatistics.jsx"
Cohesion: 0.07
Nodes (59): recharts, BarList(), DonutCard(), bucketRange(), NewUsersChart(), TABS, toIso(), CONVERSION_LINES (+51 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (36): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+28 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (3): getFactory(), parseList(), s()

### Community 17 - "usePostQuery"
Cohesion: 0.15
Nodes (27): lodash, TEXTS, DeleteAccountModal(), QuestionCountIcon(), RightIcon(), TrashIcon(), ImageUploader(), Input() (+19 more)

### Community 18 - "ProductCard.jsx"
Cohesion: 0.10
Nodes (20): dayjs, usePurchasedProducts(), EmptyState(), ErrorState(), LoadingState(), ProductCard(), ProductGrid(), StatusBadge() (+12 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.05
Nodes (23): applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_(), getRule() (+15 more)

### Community 22 - "LigaDashboard.jsx"
Cohesion: 0.07
Nodes (75): LigaSeasonEmpty(), LigaDialog(), TONES, EMPTY_TEST, LigaDashboard(), Overview(), SOURCE_LABELS, TABS (+67 more)

### Community 23 - "Auth.js"
Cohesion: 0.16
Nodes (23): clsx, @tabler/icons-react, InputPassword, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone, InputText (+15 more)

### Community 24 - "HomeStatsGrid.jsx"
Cohesion: 0.67
Nodes (3): CompletedIcon(), HomeStatsGrid(), THEMES

### Community 26 - "_app.js"
Cohesion: 0.13
Nodes (13): exitImpersonation(), ImpersonationBar(), DefaultSeo(), SEO, SiteTracker(), reactQueryClient, UserProfileContext, UserProfileProvider() (+5 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.10
Nodes (13): @tabler/icons, StyledAccordian, TabEmbedding(), StyledAccordian, TabPayments(), StyledAccordian, TabTeamScheduling(), StyledAccordian (+5 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.14
Nodes (22): swiper, closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection(), normalizeTitle(), GameRenderer(), MentalGamePlayPage() (+14 more)

### Community 29 - "BattleArena.jsx"
Cohesion: 0.12
Nodes (23): BattleArena(), BattleChat(), BattleLevelBadge(), LEVEL_COLORS, AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial() (+15 more)

### Community 30 - "role-landing/shared.jsx"
Cohesion: 0.08
Nodes (52): DEFAULT_PRIZES, Heading(), LeagueDetails(), POINT_ICONS, PRIZES, RULE_ICONS, SEASON_ICONS, TEXT (+44 more)

### Community 31 - "StudentTable.jsx"
Cohesion: 0.08
Nodes (49): docx, Chip(), DateInput(), daysAgo(), formatDay(), MoreFilters(), toISO(), Avatar() (+41 more)

### Community 32 - "student/my-study/index.js"
Cohesion: 0.20
Nodes (12): react-paginate, EmptyPage(), ButtonCellRenderer(), GridExample(), Pagination(), MyStudyAcitve(), NavbarStudy(), StudentExamplePagination() (+4 more)

### Community 33 - "gamesData.js"
Cohesion: 0.08
Nodes (8): safekidSeeds, cache, handler(), pick(), toTitle(), categoryConfig, MentalGames(), normalizeTitle()

### Community 34 - "next"
Cohesion: 0.06
Nodes (8): next, NEWS, newsApi, NewsPage(), newsApi, NewsSlider(), footerLinks, config

### Community 35 - "store/index.js"
Cohesion: 0.09
Nodes (24): zustand, Brand(), PremiumCrown(), getMenuItems(), Main(), MainWrapper(), Navbar(), SearchInput() (+16 more)

### Community 36 - "i"
Cohesion: 0.03
Nodes (4): getSeparator(), i(), merge(), pauseValue()

### Community 37 - "GameRenderer.js"
Cohesion: 0.16
Nodes (16): GameRenderer(), BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle() (+8 more)

### Community 38 - "DiagnosticMistakes.jsx"
Cohesion: 0.14
Nodes (25): AttemptPicker(), AttemptsCarousel(), AttemptsTrendChart(), PAD, RANGES, BalanceCard(), LegendRow(), MistakesSummary() (+17 more)

### Community 39 - "ChildOverview.jsx"
Cohesion: 0.05
Nodes (97): useChat(), useChatSocket(), SwitchToChildButton(), ChildHero(), InfoChip(), ChaptersCard(), ChildOverview(), TABS (+89 more)

### Community 42 - "ReviewCarousel.js"
Cohesion: 0.11
Nodes (6): react-slick, slick-carousel, ReviewCarousel(), Reviews, SampleNextArrow(), SamplePrevArrow()

### Community 43 - "LigaHome.jsx"
Cohesion: 0.11
Nodes (22): KEYS, MATH_FIELD_CONFIG, MathEditor(), serialize(), splitBy(), splitMath(), useScreenshotGuard(), LigaGuard() (+14 more)

### Community 44 - "framer-motion"
Cohesion: 0.15
Nodes (15): framer-motion, InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions (+7 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.11
Nodes (7): ExceptionalFeature(), slide1, slide2, slide3, StyledAnimationContent, StyledAnimationContent2, StyledAnimationFeature

### Community 46 - "[student_id].js"
Cohesion: 0.10
Nodes (28): react-dom, Eye(), buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal() (+20 more)

### Community 47 - "BattleSetupForm.jsx"
Cohesion: 0.18
Nodes (13): BattleRatingWidget(), WidgetShell(), BattleRulesCard(), RULES, BattleSetupForm(), getSubjectIcon(), GRADE_ICON_STYLE, QUESTION_COUNT_OPTIONS (+5 more)

### Community 48 - "BottomSections.jsx"
Cohesion: 0.09
Nodes (55): AppSection(), CtaBanner(), FaqSection(), FEATURE_COLORS, FEATURE_ICONS, MotivationSection(), PILL_COLORS, PILL_ICONS (+47 more)

### Community 49 - "LanguageDropdown"
Cohesion: 0.26
Nodes (9): Flag(), FLAGS, LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), formatTime(), QuestionTopBar() (+1 more)

### Community 50 - "lucide-react"
Cohesion: 0.22
Nodes (13): lucide-react, fieldBorder, fieldBox, fieldIcon, fieldInput, SelectClass(), TEXT, AddChildModal() (+5 more)

### Community 51 - "NewsSingle.jsx"
Cohesion: 0.24
Nodes (15): HomePage(), TEXTS, NewsSingle(), Shell(), TEXTS, FILTERS, NewsAll(), TEXTS (+7 more)

### Community 52 - "menuConfig.js"
Cohesion: 0.21
Nodes (9): DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), ProductsIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil() (+1 more)

### Community 53 - "student/chat/index.js"
Cohesion: 0.25
Nodes (8): ChatEmptyState(), ChatFilters(), ChatPagination(), ChatRequestCard(), ChatRequestList(), useChatData(), useStatusUtils(), ChatPage()

### Community 54 - "SwitchToChildButton.jsx"
Cohesion: 0.17
Nodes (16): ActingParentBar(), DeviceLimitModal(), DeviceIcon(), DeviceRow(), formatDeviceDate(), ICONS, VARIANTS, replaceSession() (+8 more)

### Community 55 - "next-auth"
Cohesion: 0.11
Nodes (21): EyeIcon(), ContentLoader(), SearchInput(), SelectBox(), ActivityTable(), ChildNotFoundState(), NoActivityState(), ChildDetail() (+13 more)

### Community 56 - "dashboard/index.jsx"
Cohesion: 0.36
Nodes (5): next-themes, Dashboard(), MainContentHead(), MainContent(), Sidebar()

### Community 57 - "react-i18next"
Cohesion: 0.11
Nodes (16): ModalConfidentiality(), GROUP_ICON_BG, progressColor(), TutorGroupsCard(), TutorHomeGreeting(), UZ_MONTHS, AVATAR_COLORS, initialsOf() (+8 more)

### Community 58 - "MyChildren.jsx"
Cohesion: 0.28
Nodes (10): RemoveChildModal(), GRADE_TONES, gradeTone(), isActive(), MyChildren(), RowMenu(), splitDateTime(), subjectStyle() (+2 more)

### Community 61 - "StudentProfile.jsx"
Cohesion: 0.16
Nodes (14): CouponUsersList(), EmptyUserState(), StudentProfile(), TEXT, CoinsHistoryTab(), CouponsTab(), DevicesTab(), FinesTab() (+6 more)

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.30
Nodes (7): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, DndList(), SortableItem(), DragIcon(), SortableTableRow()

### Community 64 - "HpHeader.js"
Cohesion: 0.29
Nodes (9): AppBarStyled, defaultLinks, DrawerHeader, HpHeader(), socialIcons, ToolbarStyled, MobileSidebar(), Navigations() (+1 more)

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.14
Nodes (15): DeleteAccountCard(), ACTIVITY_META, TutorProfileActivity(), initialsOf(), TutorProfileHero(), Row(), TutorProfileInfo(), TutorProfileQuickLinks() (+7 more)

### Community 66 - "MistakeQuestionCard.jsx"
Cohesion: 0.36
Nodes (10): ActionSolution(), answersOf(), ChoiceRow(), choiceText(), MathHtml(), MistakeQuestionCard(), NUMBER_STYLE, pick() (+2 more)

### Community 67 - "AuthMascot.jsx"
Cohesion: 0.29
Nodes (9): AuthCard(), Logo(), AuthMascot(), Eye(), PHRASES, useAuthMascot, Wing(), WINGS (+1 more)

### Community 68 - "form/index.js"
Cohesion: 0.27
Nodes (4): Address(), ShapeBg, Form(), numbers

### Community 69 - "RoleChooser.jsx"
Cohesion: 0.29
Nodes (7): LANGS, RoleChooser(), ROLES, TEXT, NavbarLangue(), HomePage(), useSettingsStore

### Community 70 - "SomTransfer.jsx"
Cohesion: 0.36
Nodes (7): TransferTab(), TransferConfirm(), TransferForm(), TransferHistory(), SomTransfer(), STEPS, TransferPage()

### Community 71 - "Features.js"
Cohesion: 0.36
Nodes (7): cardStyle, FeatureCard(), Features(), IconHeader(), images, ResponsiveImage(), FeatureTitle()

### Community 73 - "uzbekistan-map/index.jsx"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 74 - "BuyBookModal.jsx"
Cohesion: 0.17
Nodes (16): BookCard(), ActiveTag(), BookFilter(), CheckPill(), FilterSelect(), INITIAL_FILTERS, BuyBookModal(), nf() (+8 more)

### Community 75 - "dashboard-nav/index.jsx"
Cohesion: 0.57
Nodes (4): DashboardNav(), MenuSection(), ProfileSection(), SidebarTitle()

### Community 76 - "key-metric/index.js"
Cohesion: 0.36
Nodes (6): FEATURES, formatCount(), highlightBrand(), KeyMetric(), splitParagraphs(), TEXTS

### Community 78 - "Landing.jsx"
Cohesion: 0.11
Nodes (21): AppStoreButtons(), Benefits(), CARD_STYLES, TEXTS, ChatBubble(), FAQ(), isYoutube(), QuestionBubble() (+13 more)

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "student/individual/index.js"
Cohesion: 0.47
Nodes (4): Individual(), Index(), rowData, rowDataUz

### Community 81 - "SubscriptionPromoModal.jsx"
Cohesion: 0.09
Nodes (22): @mui/icons-material, AVATAR_COLORS, DetailItem(), ParentChildrenCard(), CouponSection(), ModalHeader(), NASIYA_TERMS, NasiyaInstallmentOption() (+14 more)

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 83 - "LeadershipSlider.js"
Cohesion: 0.32
Nodes (6): Leadership(), TEXTS, leadershipApi, LeadershipSlider(), mathJaxConfig, PROFESSIONS

### Community 85 - "ParentQr.jsx"
Cohesion: 0.11
Nodes (23): qrcode.react, APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH, LOGO_URL, Corner(), FeatureCard(), FEATURES (+15 more)

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 87 - "RobotWalker.jsx"
Cohesion: 0.47
Nodes (4): three, random(), RobotWalker(), stripRootMotion()

### Community 99 - "MyPurchasedBooks.jsx"
Cohesion: 0.53
Nodes (5): CoverImage(), MyPurchasedBooks(), STATUS_CONFIG, StatusBadge(), toAbs()

### Community 101 - "url.js"
Cohesion: 0.07
Nodes (32): react-hook-form, react-hot-toast, @tanstack/react-query, TEXTS, URLS, useGetPlans(), FEATURES, TONES (+24 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 109 - "StudentExampleDetailLayout.jsx"
Cohesion: 0.14
Nodes (12): better-react-mathjax, html-react-parser, cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), StudentExampleDetailLayout(), parseHtml() (+4 more)

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 113 - "TeacherGroupDetail.jsx"
Cohesion: 0.12
Nodes (32): UngroupedStudentsModal(), GROUPS_PATH, TEACHER_GROUP_KEYS, TeacherGroupDetail(), StatTile(), TeacherGroups(), AddStudentsModal(), ConfirmModal() (+24 more)

### Community 124 - "SubjectOld.jsx"
Cohesion: 0.10
Nodes (29): @ckeditor/ckeditor5-react, react-icons, react-player, Button(), CloseIcon(), EditIcon(), VideoPlayer(), config (+21 more)

### Community 129 - "test-calc/index.js"
Cohesion: 0.15
Nodes (10): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, availableMathSymbols, MathSymbols(), symbolsList (+2 more)

### Community 165 - "header/index.jsx"
Cohesion: 0.23
Nodes (9): Header(), navLinks, InstagramIcon(), PhoneIcon(), TelegramIcon(), YoutubeIcon(), ADDRESS_MAP_URL, SOCIAL_LINKS (+1 more)

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.13
Nodes (27): CardDiagnostic(), scoreColor(), CardLockedSubject(), CardSubject(), DEFAULT_THEME, SectionHeader(), StatsCarousel(), COMPLETED_COLOR (+19 more)

### Community 173 - "ParentConnect.jsx"
Cohesion: 0.33
Nodes (9): axios, BrandMark(), api, errorText(), Field(), formatPhone(), ParentConnect(), PasswordField() (+1 more)

### Community 175 - "student/subjects/[id]/index.js"
Cohesion: 0.14
Nodes (18): BaseBreadcrumbs(), ChartIcon(), ClockIcon(), formatDuration(), ListIcon(), ReactPlayer, StatTile(), TopicDetail() (+10 more)

## Knowledge Gaps
- **33 isolated node(s):** `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image`, `@ckeditor/ckeditor5-source-editing`, `@ckeditor/ckeditor5-special-characters` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1014 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `LayoutAdmin`, `Referrals.jsx`, `QuestionForm.jsx`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `@heroui/react`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `LigaDashboard.jsx`, `Auth.js`, `_app.js`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `gamesData.js`, `next`, `store/index.js`, `GameRenderer.js`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaHome.jsx`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `menuConfig.js`, `student/chat/index.js`, `SwitchToChildButton.jsx`, `next-auth`, `dashboard/index.jsx`, `react-i18next`, `MyChildren.jsx`, `StudentProfile.jsx`, `@dnd-kit/sortable`, `HpHeader.js`, `TutorProfile.jsx`, `MistakeQuestionCard.jsx`, `AuthMascot.jsx`, `form/index.js`, `RoleChooser.jsx`, `SomTransfer.jsx`, `Features.js`, `PaymentMethods.js`, `uzbekistan-map/index.jsx`, `BuyBookModal.jsx`, `dashboard-nav/index.jsx`, `key-metric/index.js`, `Landing.jsx`, `useImageAccentColor.js`, `student/individual/index.js`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `ParentQr.jsx`, `RobotWalker.jsx`, `react-circular-progressbar`, `MentorClosedChatsStats.jsx`, `url.js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`, `test-calc/index.js`, `header/index.jsx`, `DiagnosticSubjects.jsx`, `ParentConnect.jsx`, `student/subjects/[id]/index.js`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **What connects `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LayoutAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.07346459006758742 - nodes in this community are weakly interconnected._
- **Why does `react-i18next` connect `LayoutAdmin` to `Referrals.jsx`, `QuestionForm.jsx`, `react`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `@heroui/react`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `Auth.js`, `HomeStatsGrid.jsx`, `_app.js`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `gamesData.js`, `next`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaHome.jsx`, `framer-motion`, `ParentConnect.jsx`, `[student_id].js`, `student/subjects/[id]/index.js`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `BattleSetupForm.jsx`, `student/chat/index.js`, `SwitchToChildButton.jsx`, `next-auth`, `react-i18next`, `MyChildren.jsx`, `StudentProfile.jsx`, `ParentProfileInfoCard.jsx`, `HpHeader.js`, `TutorProfile.jsx`, `MistakeQuestionCard.jsx`, `AuthMascot.jsx`, `RoleChooser.jsx`, `SomTransfer.jsx`, `Features.js`, `BuyBookModal.jsx`, `dashboard-nav/index.jsx`, `key-metric/index.js`, `Landing.jsx`, `student/individual/index.js`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `i18n/index.js`, `ParentQr.jsx`, `react-circular-progressbar`, `SubjectsBanner.jsx`, `DiagnosticSubjects.jsx`, `CoinsTab.jsx`, `ParentQuickActions.jsx`, `ParentStatsGrid.jsx`, `ParentProfileQuickActions.jsx`, `MentorClosedChatsStats.jsx`, `MyPurchasedBooks.jsx`, `url.js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06533646322378717 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `LayoutAdmin`, `test-calc/index.js`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `@mui/material`, `@heroui/react`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `LigaDashboard.jsx`, `Auth.js`, `_app.js`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaHome.jsx`, `DiagnosticSubjects.jsx`, `exceptional-feature/index.js`, `ParentConnect.jsx`, `student/subjects/[id]/index.js`, `framer-motion`, `LanguageDropdown`, `BattleSetupForm.jsx`, `NewsSingle.jsx`, `menuConfig.js`, `student/chat/index.js`, `[student_id].js`, `next-auth`, `dashboard/index.jsx`, `react-i18next`, `MyChildren.jsx`, `HpHeader.js`, `TutorProfile.jsx`, `form/index.js`, `RoleChooser.jsx`, `Features.js`, `PaymentMethods.js`, `BuyBookModal.jsx`, `dashboard-nav/index.jsx`, `Landing.jsx`, `student/individual/index.js`, `SubscriptionPromoModal.jsx`, `ParentQr.jsx`, `ParentQuickActions.jsx`, `url.js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `BottomSections.jsx`, `SubjectOld.jsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02631578947368421 - nodes in this community are weakly interconnected._