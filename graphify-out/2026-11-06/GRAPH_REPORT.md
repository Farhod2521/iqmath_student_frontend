# Graph Report - iqmath_student  (2026-11-05)

## Corpus Check
- 786 files · ~4,154,421 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 37 file(s) not represented in the graph (top: .otf 18, .css 6, .glb 4)

## Summary
- 3339 nodes · 10065 edges · 143 communities (92 shown, 51 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3cf521db`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LayoutAdmin
- CouponsList.jsx
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
- StudentHome.jsx
- L
- StudentOverview.jsx
- @tabler/icons
- PricingContent.jsx
- BattleArena.jsx
- role-landing/shared.jsx
- StudentTable.jsx
- BattleSetupForm.jsx
- gamesData.js
- next
- store/index.js
- i
- GameRenderer.js
- DiagnosticMistakes.jsx
- MiddleRow.jsx
- o
- Q
- ReviewCarousel.js
- ChildOverview.jsx
- framer-motion
- exceptional-feature/index.js
- [student_id].js
- echarts-for-react
- BottomSections.jsx
- LanguageDropdown
- lucide-react
- NewsSingle.jsx
- menuConfig.js
- overview/PaymentsTab.jsx
- SwitchToChildButton.jsx
- next-auth
- dashboard-nav/index.jsx
- react-i18next
- MyChildren.jsx
- n
- r
- StudentProfile.jsx
- ParentProfile.jsx
- @dnd-kit/sortable
- ParentQr.jsx
- TutorProfile.jsx
- FreeLessons.jsx
- AuthMascot.jsx
- ChildHero.jsx
- ratings/index.js
- overview/DevicesTab.jsx
- Features.js
- uzbekistan-map/index.jsx
- BuyBookModal.jsx
- ProductsExchange.jsx
- key-metric/index.js
- footer/index.js
- Landing.jsx
- useImageAccentColor.js
- Statistics
- SubscriptionPromoModal.jsx
- eslint.config.mjs
- LeadershipSlider.js
- i18n/index.js
- app.js
- ckeditor.js
- RobotWalker.jsx
- usePersistentTimer
- SubjectsBanner.jsx
- AGENTS.md
- .singletonFocus
- library/index.js
- api/index.js
- devDependencies
- scripts
- StudentExampleDetailLayout.jsx
- Editing this README
- TeacherGroupDetail.jsx
- compilerOptions
- next.config.mjs
- SubjectOld.jsx
- react-icons
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- header/index.jsx
- DiagnosticSubjects.jsx
- teacher/subjects/[id]/index.js
- student/subjects/[id]/index.js

## God Nodes (most connected - your core abstractions)
1. `react` - 445 edges
2. `react-i18next` - 380 edges
3. `lucide-react` - 200 edges
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
- `StudentProfile()` --indirect_call--> `CouponsTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/CouponsTab.jsx
- `StudentProfile()` --indirect_call--> `ProfileInfoTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/ProfileInfoTab.jsx
- `DeleteAccountCard()` --calls--> `DeleteAccountModal()`  [EXTRACTED]
  src/components/account/DeleteAccountCard.jsx → src/components/account/DeleteAccountModal.jsx
- `DeleteAccountModal()` --calls--> `logout()`  [EXTRACTED]
  src/components/account/DeleteAccountModal.jsx → src/shared/utils/logout.js

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (143 total, 51 thin omitted)

### Community 0 - "LayoutAdmin"
Cohesion: 0.08
Nodes (45): next-themes, HeaderTitle(), OnlinePing(), Individual(), LayoutAdmin(), StudentInvitationsModal(), EmptyState(), LoadingState() (+37 more)

### Community 1 - "CouponsList.jsx"
Cohesion: 0.26
Nodes (7): @heroicons/react, CouponCard(), CouponsList(), CouponUsersList(), EmptyUserState(), EmptyCuponState(), CouponsTab()

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
Cohesion: 0.04
Nodes (9): react, react-circular-progressbar, RoomContext, TopicContext, ChatEmptyState(), ChatRequestCard(), ChatRequestList(), leaderboard (+1 more)

### Community 6 - "useGetQuery"
Cohesion: 0.12
Nodes (23): lodash, next-auth, UserAgreement(), ProfileDetails(), TopicDropdown(), KEYS, URLS, useGetQuery() (+15 more)

### Community 7 - "DiagnosticQuestions.jsx"
Cohesion: 0.23
Nodes (15): ModalLevel(), DiagnosticQuestions(), DiagnosticTest(), addWrapper(), isSimpleNumber(), isWrapped(), needsWrapper(), normalizeAnswerForBackend() (+7 more)

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
Cohesion: 0.04
Nodes (8): @mui/material, BaseCard(), keys, Address(), ShapeBg, Form(), numbers, Licenses

### Community 13 - "@heroui/react"
Cohesion: 0.22
Nodes (9): @heroui/react, SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), CreateReferalModal(), DiagnosticResultModal(), SendToMentorModal(), SubjectQuestions() (+1 more)

### Community 14 - "SiteStatistics.jsx"
Cohesion: 0.08
Nodes (52): recharts, BarList(), DonutCard(), bucketRange(), NewUsersChart(), TABS, toIso(), CONVERSION_LINES (+44 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (39): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+31 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (3): getFactory(), parseList(), s()

### Community 17 - "usePostQuery"
Cohesion: 0.34
Nodes (13): DeleteAccountModal(), RightIcon(), TrashIcon(), ImageUploader(), AnimateUp(), postRequest(), usePostQuery(), NavbarNotification() (+5 more)

### Community 18 - "ProductCard.jsx"
Cohesion: 0.15
Nodes (11): dayjs, ErrorState(), ProductCard(), ProductGrid(), StatusBadge(), formatUzbekDate(), uzbekLocale, uzbekMonths (+3 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.05
Nodes (23): applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_(), getRule() (+15 more)

### Community 22 - "LigaDashboard.jsx"
Cohesion: 0.06
Nodes (74): LigaSeasonEmpty(), LigaDialog(), TONES, useScreenshotGuard(), LigaGuard(), Countdown(), formatDate(), LigaHome() (+66 more)

### Community 23 - "Auth.js"
Cohesion: 0.16
Nodes (23): react-hook-form, InputPassword, SpinnerIcon(), SimpleLoader(), CredentialsPopup(), Auth(), AuthButton(), AuthForgetPassword() (+15 more)

### Community 24 - "StudentHome.jsx"
Cohesion: 0.16
Nodes (15): buildMonthGrid(), formatDDMMYYYY(), HomeCalendarCard(), MONTH_LABELS_UZ, STREAK_TEXT, WEEKDAYS_UZ, HomeHero(), HomeRecentActivity() (+7 more)

### Community 26 - "StudentOverview.jsx"
Cohesion: 0.05
Nodes (37): exitImpersonation(), ImpersonationBar(), DefaultSeo(), SEO, SiteTracker(), authSecret, config, reactQueryClient (+29 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.10
Nodes (13): @tabler/icons, StyledAccordian, TabEmbedding(), StyledAccordian, TabPayments(), StyledAccordian, TabTeamScheduling(), StyledAccordian (+5 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.15
Nodes (21): closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection(), normalizeTitle(), GameRenderer(), MentalGamePlayPage(), CATEGORY_ICONS (+13 more)

### Community 29 - "BattleArena.jsx"
Cohesion: 0.10
Nodes (29): BattleArena(), BattleChat(), BattleLevelBadge(), LEVEL_COLORS, AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial() (+21 more)

### Community 30 - "role-landing/shared.jsx"
Cohesion: 0.08
Nodes (52): DEFAULT_PRIZES, Heading(), LeagueDetails(), POINT_ICONS, PRIZES, RULE_ICONS, SEASON_ICONS, TEXT (+44 more)

### Community 31 - "StudentTable.jsx"
Cohesion: 0.08
Nodes (47): docx, Chip(), DateInput(), daysAgo(), formatDay(), MoreFilters(), toISO(), Avatar() (+39 more)

### Community 32 - "BattleSetupForm.jsx"
Cohesion: 0.08
Nodes (31): react-paginate, EmptyPage(), ButtonCellRenderer(), GridExample(), Pagination(), SearchInput(), SelectBox(), MyStudyAcitve() (+23 more)

### Community 33 - "gamesData.js"
Cohesion: 0.08
Nodes (5): safekidSeeds, cache, handler(), pick(), toTitle()

### Community 34 - "next"
Cohesion: 0.08
Nodes (19): next, Brand(), LANGS, RoleChooser(), ROLES, TEXT, AppBarStyled, defaultLinks (+11 more)

### Community 35 - "store/index.js"
Cohesion: 0.12
Nodes (21): zustand, PremiumCrown(), getMenuItems(), MenuType, Main(), MainWrapper(), Navbar(), SearchInput() (+13 more)

### Community 36 - "i"
Cohesion: 0.03
Nodes (4): getSeparator(), i(), merge(), pauseValue()

### Community 37 - "GameRenderer.js"
Cohesion: 0.16
Nodes (16): GameRenderer(), BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle() (+8 more)

### Community 38 - "DiagnosticMistakes.jsx"
Cohesion: 0.11
Nodes (35): ActionSolution(), AttemptPicker(), AttemptsCarousel(), AttemptsTrendChart(), PAD, RANGES, BalanceCard(), answersOf() (+27 more)

### Community 39 - "MiddleRow.jsx"
Cohesion: 0.16
Nodes (26): AchievementsCard(), AchievementsModal(), Badge(), RANK_STYLE, TopTopicsCard(), Delta(), ParentHero(), ParentStats() (+18 more)

### Community 42 - "ReviewCarousel.js"
Cohesion: 0.11
Nodes (6): react-slick, slick-carousel, ReviewCarousel(), Reviews, SampleNextArrow(), SamplePrevArrow()

### Community 43 - "ChildOverview.jsx"
Cohesion: 0.24
Nodes (19): ChaptersCard(), ChildOverview(), TABS, ChildOnline(), ChildRecent(), ChildStats(), Delta(), DevicesCard() (+11 more)

### Community 44 - "framer-motion"
Cohesion: 0.14
Nodes (15): InfoCircleIcon(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions, InfoWarning(), ActionInfo() (+7 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.11
Nodes (7): ExceptionalFeature(), slide1, slide2, slide3, StyledAnimationContent, StyledAnimationContent2, StyledAnimationFeature

### Community 46 - "[student_id].js"
Cohesion: 0.19
Nodes (17): Eye(), DailyTaskDetailModal(), buildApiParams(), DailyTasksPage(), formatScore(), getCurrentWeek(), getDaysInRange(), getLocalizedName() (+9 more)

### Community 47 - "echarts-for-react"
Cohesion: 0.11
Nodes (5): echarts-for-react, days, heatmapData, hours, DONUT_COLORS

### Community 48 - "BottomSections.jsx"
Cohesion: 0.09
Nodes (55): AppSection(), CtaBanner(), FaqSection(), FEATURE_COLORS, FEATURE_ICONS, MotivationSection(), PILL_COLORS, PILL_ICONS (+47 more)

### Community 49 - "LanguageDropdown"
Cohesion: 0.21
Nodes (11): Flag(), FLAGS, LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), NavbarLangue(), formatTime() (+3 more)

### Community 50 - "lucide-react"
Cohesion: 0.11
Nodes (31): lucide-react, fieldBorder, fieldBox, fieldIcon, fieldInput, countDigitsBeforeCursor(), formatPhone(), getDigits() (+23 more)

### Community 51 - "NewsSingle.jsx"
Cohesion: 0.24
Nodes (15): HomePage(), TEXTS, NewsSingle(), Shell(), TEXTS, FILTERS, NewsAll(), TEXTS (+7 more)

### Community 52 - "menuConfig.js"
Cohesion: 0.21
Nodes (9): DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), ProductsIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil() (+1 more)

### Community 53 - "overview/PaymentsTab.jsx"
Cohesion: 0.21
Nodes (15): CalendarArt(), ExtendSubscriptionModal(), FEATURES, TONES, formatMoney(), InfoTile(), MonthlyChart(), PaymentsTab() (+7 more)

### Community 54 - "SwitchToChildButton.jsx"
Cohesion: 0.24
Nodes (11): ActingParentBar(), DeviceLimitModal(), DeviceIcon(), DeviceRow(), formatDeviceDate(), ICONS, SwitchToChildButton(), VARIANTS (+3 more)

### Community 55 - "next-auth"
Cohesion: 0.12
Nodes (19): EyeIcon(), ag-grid-community, ag-grid-react, ContentLoader(), ActivityTable(), ChildNotFoundState(), ChildDetail(), Friends() (+11 more)

### Community 56 - "dashboard-nav/index.jsx"
Cohesion: 0.26
Nodes (8): DashboardNav(), Dashboard(), MainContentHead(), MainContent(), MenuSection(), ProfileSection(), Sidebar(), SidebarTitle()

### Community 57 - "react-i18next"
Cohesion: 0.10
Nodes (24): qrcode.react, react-i18next, ChatFilters(), ChatPagination(), useChatData(), useStatusUtils(), GROUP_ICON_BG, progressColor() (+16 more)

### Community 58 - "MyChildren.jsx"
Cohesion: 0.24
Nodes (12): RemoveChildModal(), GRADE_TONES, gradeTone(), isActive(), MyChildren(), RowMenu(), splitDateTime(), subjectStyle() (+4 more)

### Community 61 - "StudentProfile.jsx"
Cohesion: 0.13
Nodes (20): swiper, CoinsIcon(), CoinConvert(), RATES, StudentProfile(), TEXT, CoinsHistoryTab(), CoinsTab() (+12 more)

### Community 62 - "ParentProfile.jsx"
Cohesion: 0.21
Nodes (11): Input(), ParentChangePasswordModal(), ParentEditInfoModal(), ParentProfileHero(), ParentProfileInfoCard(), Row(), ActionRow(), ParentProfileQuickActions() (+3 more)

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.28
Nodes (8): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, DndList(), SortableItem(), DragIcon(), SortableTableRow(), SortableTableRow()

### Community 64 - "ParentQr.jsx"
Cohesion: 0.31
Nodes (9): Corner(), FeatureCard(), FEATURES, ParentQr(), PhoneMock(), StepCard(), StepIllustration(), STEPS (+1 more)

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.12
Nodes (19): DeleteAccountCard(), TEXTS, InfoRow(), ProfileInfoTab(), SectionCard(), ACTIVITY_META, TutorProfileActivity(), initialsOf() (+11 more)

### Community 66 - "FreeLessons.jsx"
Cohesion: 0.29
Nodes (9): formatDateTime(), formatPhone(), FreeLessons(), LeadRow(), pad(), STATUS_KEYS, STATUS_STYLE, TEXTS (+1 more)

### Community 67 - "AuthMascot.jsx"
Cohesion: 0.33
Nodes (8): AuthCard(), Logo(), AuthMascot(), Eye(), PHRASES, useAuthMascot, Wing(), WINGS

### Community 68 - "ChildHero.jsx"
Cohesion: 0.49
Nodes (8): ChildHero(), InfoChip(), formatDate(), formatDateTime(), formatDuration(), pad(), toDate(), Initials()

### Community 69 - "ratings/index.js"
Cohesion: 0.24
Nodes (7): AVATAR_COLORS, COUNTS, getAvatarColor(), getInitial(), InitialAvatar(), PODIUM_STYLES, StudentTopLeaderboard()

### Community 70 - "overview/DevicesTab.jsx"
Cohesion: 0.40
Nodes (9): BrowserIcon(), browserOs(), ChromeIcon(), DeviceImage(), DevicesTab(), isPhone(), relativeDay(), RowMenu() (+1 more)

### Community 71 - "Features.js"
Cohesion: 0.36
Nodes (7): cardStyle, FeatureCard(), Features(), IconHeader(), images, ResponsiveImage(), FeatureTitle()

### Community 73 - "uzbekistan-map/index.jsx"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 74 - "BuyBookModal.jsx"
Cohesion: 0.39
Nodes (6): BookCard(), BuyBookModal(), nf(), PayPill(), purchaseAPI, toAbs()

### Community 75 - "ProductsExchange.jsx"
Cohesion: 0.39
Nodes (4): EmptyState(), LoadingState(), ProductsExchange(), Index()

### Community 76 - "key-metric/index.js"
Cohesion: 0.36
Nodes (6): FEATURES, formatCount(), highlightBrand(), KeyMetric(), splitParagraphs(), TEXTS

### Community 78 - "Landing.jsx"
Cohesion: 0.11
Nodes (21): AppStoreButtons(), Benefits(), CARD_STYLES, TEXTS, ChatBubble(), FAQ(), isYoutube(), QuestionBubble() (+13 more)

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "Statistics"
Cohesion: 0.29
Nodes (4): StatisticsHero(), StatsCards(), Statistics(), Index()

### Community 81 - "SubscriptionPromoModal.jsx"
Cohesion: 0.08
Nodes (30): useGetPlans(), AVATAR_COLORS, DetailItem(), ParentChildrenCard(), CouponSection(), ModalHeader(), NASIYA_TERMS, NasiyaInstallmentOption() (+22 more)

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 83 - "LeadershipSlider.js"
Cohesion: 0.32
Nodes (6): Leadership(), TEXTS, leadershipApi, LeadershipSlider(), mathJaxConfig, PROFESSIONS

### Community 85 - "app.js"
Cohesion: 0.24
Nodes (11): APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH, AppleIcon(), FEATURES, Flag(), HeroImage(), IqMathAppPage() (+3 more)

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 87 - "RobotWalker.jsx"
Cohesion: 0.47
Nodes (4): three, random(), RobotWalker(), stripRootMotion()

### Community 88 - "usePersistentTimer"
Cohesion: 0.70
Nodes (4): readStart(), removeStart(), usePersistentTimer(), writeStart()

### Community 99 - "library/index.js"
Cohesion: 0.25
Nodes (11): ActiveTag(), BookFilter(), CheckPill(), FilterSelect(), INITIAL_FILTERS, CoverImage(), MyPurchasedBooks(), STATUS_CONFIG (+3 more)

### Community 101 - "api/index.js"
Cohesion: 0.09
Nodes (23): react-dom, react-hot-toast, @tanstack/react-query, TEXTS, NEWS, newsApi, NewsPage(), newsApi (+15 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 109 - "StudentExampleDetailLayout.jsx"
Cohesion: 0.25
Nodes (12): better-react-mathjax, html-react-parser, cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), StudentExampleDetailLayout(), parseHtml() (+4 more)

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 113 - "TeacherGroupDetail.jsx"
Cohesion: 0.12
Nodes (32): UngroupedStudentsModal(), GROUPS_PATH, TEACHER_GROUP_KEYS, TeacherGroupDetail(), StatTile(), TeacherGroups(), AddStudentsModal(), ConfirmModal() (+24 more)

### Community 124 - "SubjectOld.jsx"
Cohesion: 0.10
Nodes (26): react-player, CloseIcon(), EditIcon(), VideoPlayer(), useDeleteQuery(), useDeleteQuestion(), putRequest(), usePutQuery() (+18 more)

### Community 127 - "react-icons"
Cohesion: 0.10
Nodes (15): react-icons, buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal(), numbers (+7 more)

### Community 129 - "test-calc/index.js"
Cohesion: 0.15
Nodes (10): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, availableMathSymbols, MathSymbols(), symbolsList (+2 more)

### Community 165 - "header/index.jsx"
Cohesion: 0.24
Nodes (9): Header(), navLinks, InstagramIcon(), PhoneIcon(), TelegramIcon(), YoutubeIcon(), ADDRESS_MAP_URL, SOCIAL_LINKS (+1 more)

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.13
Nodes (27): CardDiagnostic(), scoreColor(), CardLockedSubject(), CardSubject(), DEFAULT_THEME, SectionHeader(), StatsCarousel(), COMPLETED_COLOR (+19 more)

### Community 173 - "teacher/subjects/[id]/index.js"
Cohesion: 0.14
Nodes (21): axios, @ckeditor/ckeditor5-react, framer-motion, Button(), QuestionCountIcon(), SimpleModalTeacher(), ConfirmPurchaseModal(), PurchaseSuccessModal() (+13 more)

### Community 175 - "student/subjects/[id]/index.js"
Cohesion: 0.12
Nodes (20): BaseBreadcrumbs(), ChartIcon(), ClockIcon(), formatDuration(), ListIcon(), ReactPlayer, StatTile(), TopicDetail() (+12 more)

## Knowledge Gaps
- **33 isolated node(s):** `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image`, `@ckeditor/ckeditor5-source-editing`, `@ckeditor/ckeditor5-special-characters` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1008 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `LayoutAdmin`, `CouponsList.jsx`, `QuestionForm.jsx`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `@heroui/react`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `LigaDashboard.jsx`, `Auth.js`, `StudentHome.jsx`, `StudentOverview.jsx`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `BattleSetupForm.jsx`, `next`, `store/index.js`, `GameRenderer.js`, `DiagnosticMistakes.jsx`, `MiddleRow.jsx`, `ReviewCarousel.js`, `ChildOverview.jsx`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `echarts-for-react`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `menuConfig.js`, `overview/PaymentsTab.jsx`, `SwitchToChildButton.jsx`, `next-auth`, `dashboard-nav/index.jsx`, `react-i18next`, `MyChildren.jsx`, `StudentProfile.jsx`, `ParentProfile.jsx`, `@dnd-kit/sortable`, `ParentQr.jsx`, `TutorProfile.jsx`, `FreeLessons.jsx`, `AuthMascot.jsx`, `ratings/index.js`, `overview/DevicesTab.jsx`, `Features.js`, `PaymentMethods.js`, `uzbekistan-map/index.jsx`, `BuyBookModal.jsx`, `ProductsExchange.jsx`, `key-metric/index.js`, `footer/index.js`, `Landing.jsx`, `useImageAccentColor.js`, `Statistics`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `app.js`, `RobotWalker.jsx`, `usePersistentTimer`, `library/index.js`, `api/index.js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`, `react-icons`, `test-calc/index.js`, `header/index.jsx`, `DiagnosticSubjects.jsx`, `teacher/subjects/[id]/index.js`, `student/subjects/[id]/index.js`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **What connects `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LayoutAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.07766599597585513 - nodes in this community are weakly interconnected._
- **Why does `react-i18next` connect `react-i18next` to `LayoutAdmin`, `CouponsList.jsx`, `QuestionForm.jsx`, `react`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `@heroui/react`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `LigaDashboard.jsx`, `Auth.js`, `StudentHome.jsx`, `StudentOverview.jsx`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `BattleSetupForm.jsx`, `next`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `MiddleRow.jsx`, `ReviewCarousel.js`, `ChildOverview.jsx`, `framer-motion`, `teacher/subjects/[id]/index.js`, `DiagnosticSubjects.jsx`, `student/subjects/[id]/index.js`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `echarts-for-react`, `overview/PaymentsTab.jsx`, `SwitchToChildButton.jsx`, `next-auth`, `dashboard-nav/index.jsx`, `MyChildren.jsx`, `StudentProfile.jsx`, `ParentProfile.jsx`, `ParentQr.jsx`, `TutorProfile.jsx`, `FreeLessons.jsx`, `AuthMascot.jsx`, `ChildHero.jsx`, `ratings/index.js`, `overview/DevicesTab.jsx`, `Features.js`, `BuyBookModal.jsx`, `ProductsExchange.jsx`, `key-metric/index.js`, `Landing.jsx`, `Statistics`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `i18n/index.js`, `SubjectsBanner.jsx`, `library/index.js`, `api/index.js`, `[student_id].js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`, `react-icons`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06533646322378717 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `lucide-react` to `CouponsList.jsx`, `QuestionForm.jsx`, `useGetQuery`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@heroui/react`, `SiteStatistics.jsx`, `package.json`, `LigaDashboard.jsx`, `Auth.js`, `StudentHome.jsx`, `StudentOverview.jsx`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `BattleSetupForm.jsx`, `next`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `MiddleRow.jsx`, `ReviewCarousel.js`, `ChildOverview.jsx`, `DiagnosticSubjects.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `NewsSingle.jsx`, `overview/PaymentsTab.jsx`, `SwitchToChildButton.jsx`, `next-auth`, `react-i18next`, `MyChildren.jsx`, `StudentProfile.jsx`, `ParentProfile.jsx`, `ParentQr.jsx`, `TutorProfile.jsx`, `FreeLessons.jsx`, `AuthMascot.jsx`, `ChildHero.jsx`, `ratings/index.js`, `overview/DevicesTab.jsx`, `Features.js`, `key-metric/index.js`, `Landing.jsx`, `Statistics`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `app.js`, `SubjectsBanner.jsx`, `library/index.js`, `api/index.js`, `TeacherGroupDetail.jsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02631578947368421 - nodes in this community are weakly interconnected._