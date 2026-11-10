# Graph Report - iqmath_student  (2026-11-09)

## Corpus Check
- 791 files · ~4,159,509 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 37 file(s) not represented in the graph (top: .otf 18, .css 6, .glb 4)

## Summary
- 3378 nodes · 10178 edges · 159 communities (99 shown, 60 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7cb3cd1f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LayoutAdmin
- LigaDashboard.jsx
- h
- StudentHome.jsx
- dependencies
- react
- useGetQuery
- DiagnosticQuestions.jsx
- Theme.js
- ChatBoxModule.js
- QuestionWorkspace.jsx
- T
- @mui/material
- SubjectQuestions.jsx
- SiteStatistics.jsx
- package.json
- s
- usePostQuery
- ProductCard.jsx
- c
- tex-mml-svg.js
- a
- liga/utils.js
- Auth.js
- react-i18next
- L
- _app.js
- @tabler/icons
- PricingContent.jsx
- BattleArena.jsx
- role-landing/shared.jsx
- StudentTable.jsx
- student/my-study/index.js
- gamesData.js
- footer/index.js
- store/index.js
- i
- GameRenderer.js
- DiagnosticMistakes.jsx
- ChildOverview.jsx
- o
- Q
- ReviewCarousel.js
- LigaTestRun.jsx
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
- ParentConnect.jsx
- ContentLoader
- middleware.js
- LigaTestDetail.jsx
- StudentChatPanel.jsx
- n
- r
- StudentProfile.jsx
- store/index.js
- @dnd-kit/sortable
- RoleChooser.jsx
- TutorProfile.jsx
- lucide-react
- AuthMascot.jsx
- form/index.js
- SwitchToChildButton.jsx
- MathEditor.jsx
- StudentExampleTable.jsx
- FreeLessons.jsx
- AuthRecieveCode.js
- LigaHome.jsx
- key-metric/index.js
- TopicDetail.jsx
- Landing.jsx
- useImageAccentColor.js
- UngroupedStudentsModal.jsx
- SubscriptionPromoModal.jsx
- eslint.config.mjs
- wrapAnswer.js
- i18n/index.js
- app.js
- ckeditor.js
- RobotWalker.jsx
- ReviewCarousel.js
- uzbekistan-map/index.jsx
- AGENTS.md
- history/index.js
- [id]/index.jsx
- Features.js
- BuyBookModal.jsx
- [...nextauth].js
- HeaderAlert.js
- .singletonFocus
- LeadershipSlider.js
- ProductsExchange.jsx
- api/index.js
- devDependencies
- scripts
- CardSubject.jsx
- TutorProfileActivity.jsx
- ParentQr.jsx
- SubjectsBanner.jsx
- TutorGroupsCard.jsx
- TutorRecentStudents.jsx
- Editing this README
- TutorStatsGrid.jsx
- TeacherGroupDetail.jsx
- ParentQuickActions.jsx
- ParentStatsGrid.jsx
- TutorHomeGreeting.jsx
- compilerOptions
- next.config.mjs
- SubjectOld.jsx
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- header/index.jsx
- DiagnosticSubjects.jsx
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
- `MainWrapper()` --calls--> `useSettingStore`  [EXTRACTED]
  src/layout/MainWrapper.jsx → src/store/useSettingStore.js
- `NavbarTitle()` --calls--> `useSettingStore`  [EXTRACTED]
  src/layout/navbar/NavbarTitle.jsx → src/store/useSettingStore.js
- `StudentProfile()` --indirect_call--> `CoinsTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/CoinsTab.jsx
- `StudentProfile()` --indirect_call--> `ProfileInfoTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/ProfileInfoTab.jsx

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (159 total, 60 thin omitted)

### Community 0 - "LayoutAdmin"
Cohesion: 0.06
Nodes (55): next-themes, ActingParentBar(), HeaderTitle(), OnlinePing(), Individual(), LayoutAdmin(), StudentInvitationsModal(), SubjectBreadcrumbs() (+47 more)

### Community 1 - "LigaDashboard.jsx"
Cohesion: 0.15
Nodes (26): LigaDialog(), EMPTY_TEST, LigaDashboard(), Overview(), SOURCE_LABELS, TABS, Tests(), TESTS_HERO (+18 more)

### Community 2 - "h"
Cohesion: 0.07
Nodes (11): b(), d(), e(), f(), g(), h(), e(), m() (+3 more)

### Community 3 - "StudentHome.jsx"
Cohesion: 0.16
Nodes (15): buildMonthGrid(), formatDDMMYYYY(), HomeCalendarCard(), MONTH_LABELS_UZ, STREAK_TEXT, WEEKDAYS_UZ, HomeHero(), HomeRecentActivity() (+7 more)

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (76): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+68 more)

### Community 5 - "react"
Cohesion: 0.03
Nodes (10): echarts-for-react, react, RoomContext, TopicContext, days, heatmapData, hours, leaderboard (+2 more)

### Community 6 - "useGetQuery"
Cohesion: 0.09
Nodes (32): ag-grid-community, ag-grid-react, lodash, UserAgreement(), ProfileDetails(), TopicDropdown(), KEYS, URLS (+24 more)

### Community 7 - "DiagnosticQuestions.jsx"
Cohesion: 0.26
Nodes (10): DiagnosticResultModal(), ModalLevel(), SubscriptionExitPromo(), readStart(), removeStart(), usePersistentTimer(), writeStart(), DiagnosticQuestions() (+2 more)

### Community 8 - "Theme.js"
Cohesion: 0.10
Nodes (31): Footer(), Banner(), AuthLanding(), ContactPage(), BannerFaq(), ScrollToTop(), Landing(), LayoutHome() (+23 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.15
Nodes (15): ChatBoxModule(), ChatHeader(), ROLE_LABELS, ChatAvatar(), ChatsList(), formatDate(), CloseModal(), EmptyMessage() (+7 more)

### Community 10 - "QuestionWorkspace.jsx"
Cohesion: 0.16
Nodes (15): react-mathquill, Calculator(), compositeMathStyle, ExamAnswerComposite(), ExamAnswerText(), textMathStyle, mathConfig, plainLength() (+7 more)

### Community 12 - "@mui/material"
Cohesion: 0.06
Nodes (4): @mui/material, BaseCard(), keys, Licenses

### Community 13 - "SubjectQuestions.jsx"
Cohesion: 0.31
Nodes (8): SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), CreateReferalModal(), SendToMentorModal(), SubjectQuestions(), CreateReferalModal(), Index()

### Community 14 - "SiteStatistics.jsx"
Cohesion: 0.05
Nodes (70): react-dom, react-icons, recharts, buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions() (+62 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (38): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+30 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (3): getFactory(), parseList(), s()

### Community 17 - "usePostQuery"
Cohesion: 0.14
Nodes (28): next, react-hot-toast, DeleteAccountModal(), TEXTS, RightIcon(), TrashIcon(), ImageUploader(), Input() (+20 more)

### Community 18 - "ProductCard.jsx"
Cohesion: 0.07
Nodes (29): dayjs, IndependentResultCard(), formatClock(), LinkRow(), MessageBubble(), ReplyButton(), dayKey(), formatDay() (+21 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.05
Nodes (23): applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_(), getRule() (+15 more)

### Community 22 - "liga/utils.js"
Cohesion: 0.13
Nodes (28): TONES, LigaParticipants(), Participants(), STARTED, LigaHero(), LigaPager(), PAGE_SIZE, STATUS_COLORS (+20 more)

### Community 23 - "Auth.js"
Cohesion: 0.22
Nodes (15): SelectRole(), SpinnerIcon(), SimpleLoader(), CredentialsPopup(), Auth(), AuthButton(), AuthForgetPassword(), AuthNewPassword() (+7 more)

### Community 24 - "react-i18next"
Cohesion: 0.09
Nodes (15): @heroicons/react, @heroui/react, react-i18next, useDeleteQuery(), CouponCard(), CouponsList(), CouponUsersList(), EmptyUserState() (+7 more)

### Community 26 - "_app.js"
Cohesion: 0.13
Nodes (13): exitImpersonation(), ImpersonationBar(), DefaultSeo(), SEO, SiteTracker(), reactQueryClient, UserProfileContext, UserProfileProvider() (+5 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.15
Nodes (9): @tabler/icons, StyledAccordian, TabEmbedding(), StyledAccordian, TabPayments(), StyledAccordian, TabTeamScheduling(), StyledAccordian (+1 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.17
Nodes (16): AuthCard(), Logo(), closeAuthModal(), openAuthWithReturn(), AuthModal(), BannerHeader(), GamesSection(), normalizeTitle() (+8 more)

### Community 29 - "BattleArena.jsx"
Cohesion: 0.12
Nodes (24): BattleArena(), BattleChat(), BattleLevelBadge(), LEVEL_COLORS, AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial() (+16 more)

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
Nodes (5): safekidSeeds, cache, handler(), pick(), toTitle()

### Community 35 - "store/index.js"
Cohesion: 0.15
Nodes (18): next-auth, swiper, CoinsIcon(), PremiumCrown(), Main(), Navbar(), SearchInput(), NavbarCoins() (+10 more)

### Community 36 - "i"
Cohesion: 0.03
Nodes (4): getSeparator(), i(), merge(), pauseValue()

### Community 37 - "GameRenderer.js"
Cohesion: 0.16
Nodes (16): GameRenderer(), BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle() (+8 more)

### Community 38 - "DiagnosticMistakes.jsx"
Cohesion: 0.05
Nodes (55): better-react-mathjax, html-react-parser, ActionSolution(), AttemptPicker(), AttemptsCarousel(), AttemptsTrendChart(), PAD, RANGES (+47 more)

### Community 39 - "ChildOverview.jsx"
Cohesion: 0.05
Nodes (95): qrcode.react, RemoveChildModal(), SwitchToChildButton(), ChildHero(), InfoChip(), ChaptersCard(), ChildOverview(), TABS (+87 more)

### Community 43 - "LigaTestRun.jsx"
Cohesion: 0.20
Nodes (12): KEYS, useScreenshotGuard(), LigaGuard(), clock(), LigaTestRun(), MathAnswerField, MJ_CONFIG, Result() (+4 more)

### Community 44 - "framer-motion"
Cohesion: 0.14
Nodes (18): framer-motion, InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions (+10 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.11
Nodes (7): ExceptionalFeature(), slide1, slide2, slide3, StyledAnimationContent, StyledAnimationContent2, StyledAnimationFeature

### Community 46 - "[student_id].js"
Cohesion: 0.19
Nodes (17): Eye(), DailyTaskDetailModal(), buildApiParams(), DailyTasksPage(), formatScore(), getCurrentWeek(), getDaysInRange(), getLocalizedName() (+9 more)

### Community 47 - "BattleSetupForm.jsx"
Cohesion: 0.18
Nodes (13): BattleRatingWidget(), WidgetShell(), BattleRulesCard(), RULES, BattleSetupForm(), getSubjectIcon(), GRADE_ICON_STYLE, QUESTION_COUNT_OPTIONS (+5 more)

### Community 48 - "BottomSections.jsx"
Cohesion: 0.10
Nodes (55): AppSection(), CtaBanner(), FaqSection(), FEATURE_COLORS, FEATURE_ICONS, MotivationSection(), PILL_COLORS, PILL_ICONS (+47 more)

### Community 49 - "LanguageDropdown"
Cohesion: 0.26
Nodes (9): Flag(), FLAGS, LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), formatTime(), QuestionTopBar() (+1 more)

### Community 50 - "lucide-react"
Cohesion: 0.25
Nodes (13): fieldBorder, fieldBox, fieldIcon, fieldInput, InputText, SelectClass(), TEXT, AddChildModal() (+5 more)

### Community 51 - "NewsSingle.jsx"
Cohesion: 0.24
Nodes (15): HomePage(), TEXTS, NewsSingle(), Shell(), TEXTS, FILTERS, NewsAll(), TEXTS (+7 more)

### Community 52 - "menuConfig.js"
Cohesion: 0.12
Nodes (17): DashboardNav(), Dashboard(), MainContentHead(), MainContent(), MenuSection(), ProfileSection(), Sidebar(), DiagnosticsIcon() (+9 more)

### Community 53 - "student/chat/index.js"
Cohesion: 0.25
Nodes (8): ChatEmptyState(), ChatFilters(), ChatPagination(), ChatRequestCard(), ChatRequestList(), useChatData(), useStatusUtils(), ChatPage()

### Community 54 - "ParentConnect.jsx"
Cohesion: 0.27
Nodes (10): axios, BrandMark(), LOGO_URL, api, errorText(), Field(), formatPhone(), ParentConnect() (+2 more)

### Community 55 - "ContentLoader"
Cohesion: 0.22
Nodes (14): StudentRewardModal(), ACTION_STYLES, Card(), mediaUrl(), StatChip(), StatusDonut(), StudentOverview(), SubjectCard() (+6 more)

### Community 57 - "LigaTestDetail.jsx"
Cohesion: 0.19
Nodes (20): LigaTable(), SectionHead(), emptyQuestion(), LETTERS, LigaTestDetail(), MathEditor, Questions(), Results() (+12 more)

### Community 58 - "StudentChatPanel.jsx"
Cohesion: 0.22
Nodes (10): useChat(), useChatSocket(), StudentAvatar(), dayKey(), dayLabel(), fileUrl(), pad(), StudentChatPanel() (+2 more)

### Community 61 - "StudentProfile.jsx"
Cohesion: 0.15
Nodes (17): StudentProfile(), TEXT, CoinsHistoryTab(), CouponsTab(), DevicesTab(), FinesTab(), PaymentsTab(), ReferralTab() (+9 more)

### Community 62 - "store/index.js"
Cohesion: 0.16
Nodes (5): zustand, config, MainWrapper(), NavbarTitle(), useLangStore

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.32
Nodes (7): @dnd-kit/sortable, @dnd-kit/utilities, DndList(), SortableItem(), DragIcon(), SortableTableRow(), SortableTableRow()

### Community 64 - "RoleChooser.jsx"
Cohesion: 0.38
Nodes (5): LANGS, RoleChooser(), ROLES, TEXT, HomePage()

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.13
Nodes (18): DeleteAccountCard(), TEXTS, InfoRow(), ProfileInfoTab(), SectionCard(), TutorHomeHero(), TutorProfileActivity(), initialsOf() (+10 more)

### Community 66 - "lucide-react"
Cohesion: 0.38
Nodes (7): lucide-react, AddStudentsModal(), InviteStudentModal(), Modal(), MoveStudentsModal(), TutorGroupDetail(), Index()

### Community 67 - "AuthMascot.jsx"
Cohesion: 0.27
Nodes (11): InputPassword, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone, AuthMascot(), Eye(), PHRASES (+3 more)

### Community 68 - "form/index.js"
Cohesion: 0.27
Nodes (4): Address(), ShapeBg, Form(), numbers

### Community 69 - "SwitchToChildButton.jsx"
Cohesion: 0.19
Nodes (16): DeviceLimitModal(), DeviceIcon(), DeviceRow(), formatDeviceDate(), ICONS, AuthSignIn(), VARIANTS, replaceSession() (+8 more)

### Community 70 - "MathEditor.jsx"
Cohesion: 0.36
Nodes (8): MATH_FIELD_CONFIG, closeBrace(), commandEnd(), MathEditor(), serialize(), splitBare(), splitBy(), splitMath()

### Community 71 - "StudentExampleTable.jsx"
Cohesion: 0.36
Nodes (6): SearchInput(), SelectBox(), CommentModal(), StudentExampleTable(), Index(), StudentExamples()

### Community 73 - "FreeLessons.jsx"
Cohesion: 0.29
Nodes (9): formatDateTime(), formatPhone(), FreeLessons(), LeadRow(), pad(), STATUS_KEYS, STATUS_STYLE, TEXTS (+1 more)

### Community 74 - "AuthRecieveCode.js"
Cohesion: 0.29
Nodes (9): react-hook-form, formatMoney(), isPopular(), PricingContent(), TEXTS, tierStyle(), GOALS, reachGoal() (+1 more)

### Community 75 - "LigaHome.jsx"
Cohesion: 0.21
Nodes (13): LigaSeasonEmpty(), CardHead(), Countdown(), formatDate(), HERO, LigaHome(), Medal(), MEDALS (+5 more)

### Community 76 - "key-metric/index.js"
Cohesion: 0.36
Nodes (6): FEATURES, formatCount(), highlightBrand(), KeyMetric(), splitParagraphs(), TEXTS

### Community 77 - "TopicDetail.jsx"
Cohesion: 0.33
Nodes (8): ChartIcon(), ClockIcon(), formatDuration(), ListIcon(), ReactPlayer, StatTile(), TopicDetail(), Index()

### Community 78 - "Landing.jsx"
Cohesion: 0.11
Nodes (19): AppStoreButtons(), Benefits(), CARD_STYLES, TEXTS, ChatBubble(), FAQ(), isYoutube(), QuestionBubble() (+11 more)

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "UngroupedStudentsModal.jsx"
Cohesion: 0.47
Nodes (7): UngroupedStudentsModal(), GroupStudentsTable(), PendingInvitationsList(), AVATAR_COLORS, avatarColor(), formatPhone(), initialsOf()

### Community 81 - "SubscriptionPromoModal.jsx"
Cohesion: 0.06
Nodes (39): @mui/icons-material, getMenuItems(), MenuType, CouponModal(), Sidebar(), SidebarFooter(), SidebarLogo(), SidebarPlan() (+31 more)

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 83 - "wrapAnswer.js"
Cohesion: 0.40
Nodes (10): addWrapper(), isSimpleNumber(), isWrapped(), needsWrapper(), normalizeAnswerForBackend(), normalizeLatex(), normalizeMultiplicationForBackend(), stripDelimiters() (+2 more)

### Community 85 - "app.js"
Cohesion: 0.24
Nodes (11): APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH, AppleIcon(), FEATURES, Flag(), HeroImage(), IqMathAppPage() (+3 more)

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 87 - "RobotWalker.jsx"
Cohesion: 0.47
Nodes (4): three, random(), RobotWalker(), stripRootMotion()

### Community 88 - "ReviewCarousel.js"
Cohesion: 0.24
Nodes (4): ReviewCarousel(), Reviews, SampleNextArrow(), SamplePrevArrow()

### Community 89 - "uzbekistan-map/index.jsx"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 92 - "history/index.js"
Cohesion: 0.23
Nodes (12): ActiveTag(), BookFilter(), CheckPill(), FilterSelect(), INITIAL_FILTERS, CoverImage(), MyPurchasedBooks(), STATUS_CONFIG (+4 more)

### Community 93 - "[id]/index.jsx"
Cohesion: 0.25
Nodes (8): EyeIcon(), ContentLoader(), ActivityTable(), ChildNotFoundState(), NoActivityState(), ChildDetail(), Index(), StatBadge()

### Community 94 - "Features.js"
Cohesion: 0.36
Nodes (7): cardStyle, FeatureCard(), Features(), IconHeader(), images, ResponsiveImage(), FeatureTitle()

### Community 95 - "BuyBookModal.jsx"
Cohesion: 0.39
Nodes (6): BookCard(), BuyBookModal(), nf(), PayPill(), purchaseAPI, toAbs()

### Community 97 - "HeaderAlert.js"
Cohesion: 0.36
Nodes (4): HeaderAlert(), NotificationBg, NotificationBg2, NotificationBg3

### Community 99 - "LeadershipSlider.js"
Cohesion: 0.32
Nodes (6): Leadership(), TEXTS, leadershipApi, LeadershipSlider(), mathJaxConfig, PROFESSIONS

### Community 100 - "ProductsExchange.jsx"
Cohesion: 0.48
Nodes (3): EmptyState(), LoadingState(), ProductsExchange()

### Community 101 - "api/index.js"
Cohesion: 0.11
Nodes (14): NEWS, newsApi, NewsPage(), newsApi, NewsSlider(), formatDate(), MentorClosedChatsStats(), PRESETS (+6 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 104 - "CardSubject.jsx"
Cohesion: 0.43
Nodes (5): CardDiagnostic(), scoreColor(), CardLockedSubject(), CardSubject(), DEFAULT_THEME

### Community 107 - "ParentQr.jsx"
Cohesion: 0.36
Nodes (8): Corner(), FeatureCard(), FEATURES, ParentQr(), PhoneMock(), StepCard(), StepIllustration(), STEPS

### Community 109 - "TutorGroupsCard.jsx"
Cohesion: 0.67
Nodes (3): GROUP_ICON_BG, progressColor(), TutorGroupsCard()

### Community 110 - "TutorRecentStudents.jsx"
Cohesion: 0.67
Nodes (3): AVATAR_COLORS, initialsOf(), TutorRecentStudents()

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 112 - "TutorStatsGrid.jsx"
Cohesion: 0.83
Nodes (3): Growth(), Tile(), TutorStatsGrid()

### Community 113 - "TeacherGroupDetail.jsx"
Cohesion: 0.17
Nodes (17): TeacherGroupDetail(), StatTile(), TeacherGroups(), ConfirmModal(), averageColorFor(), CARD_COLORS, GroupCard(), GroupFormModal() (+9 more)

### Community 124 - "SubjectOld.jsx"
Cohesion: 0.09
Nodes (37): @ckeditor/ckeditor5-react, @dnd-kit/core, react-player, @tanstack/react-query, Button(), CloseIcon(), EditIcon(), QuestionCountIcon() (+29 more)

### Community 129 - "test-calc/index.js"
Cohesion: 0.15
Nodes (10): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, availableMathSymbols, MathSymbols(), symbolsList (+2 more)

### Community 165 - "header/index.jsx"
Cohesion: 0.14
Nodes (19): Brand(), Header(), navLinks, InstagramIcon(), PhoneIcon(), TelegramIcon(), YoutubeIcon(), ADDRESS_MAP_URL (+11 more)

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.15
Nodes (22): SectionHeader(), StatsCarousel(), COMPLETED_COLOR, Donut(), GradeBars(), IN_PROGRESS_COLOR, LegendRow(), NOT_STARTED_COLOR (+14 more)

### Community 175 - "student/subjects/[id]/index.js"
Cohesion: 0.12
Nodes (15): react-circular-progressbar, BaseBreadcrumbs(), StudentBreadcrumbs(), NavbarLangue(), MotivationCard(), ACCENTS, PanelCard(), ProgressMeter() (+7 more)

## Knowledge Gaps
- **33 isolated node(s):** `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image`, `@ckeditor/ckeditor5-source-editing`, `@ckeditor/ckeditor5-special-characters` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1017 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `LayoutAdmin`, `LigaDashboard.jsx`, `StudentHome.jsx`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `SubjectQuestions.jsx`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `liga/utils.js`, `Auth.js`, `react-i18next`, `_app.js`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `footer/index.js`, `store/index.js`, `GameRenderer.js`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `menuConfig.js`, `student/chat/index.js`, `ParentConnect.jsx`, `ContentLoader`, `LigaTestDetail.jsx`, `StudentChatPanel.jsx`, `StudentProfile.jsx`, `store/index.js`, `@dnd-kit/sortable`, `RoleChooser.jsx`, `TutorProfile.jsx`, `lucide-react`, `AuthMascot.jsx`, `form/index.js`, `SwitchToChildButton.jsx`, `MathEditor.jsx`, `StudentExampleTable.jsx`, `PaymentMethods.js`, `FreeLessons.jsx`, `AuthRecieveCode.js`, `LigaHome.jsx`, `key-metric/index.js`, `TopicDetail.jsx`, `Landing.jsx`, `useImageAccentColor.js`, `UngroupedStudentsModal.jsx`, `SubscriptionPromoModal.jsx`, `app.js`, `RobotWalker.jsx`, `ReviewCarousel.js`, `uzbekistan-map/index.jsx`, `history/index.js`, `[id]/index.jsx`, `Features.js`, `BuyBookModal.jsx`, `HeaderAlert.js`, `LeadershipSlider.js`, `ProductsExchange.jsx`, `api/index.js`, `process/index.js`, `ParentQr.jsx`, `TeacherGroupDetail.jsx`, `TutorHomeGreeting.jsx`, `SubjectOld.jsx`, `test-calc/index.js`, `header/index.jsx`, `DiagnosticSubjects.jsx`, `student/subjects/[id]/index.js`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **What connects `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LayoutAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.05616605616605617 - nodes in this community are weakly interconnected._
- **Why does `react-i18next` connect `react-i18next` to `LayoutAdmin`, `StudentHome.jsx`, `react`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `SubjectQuestions.jsx`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `Auth.js`, `_app.js`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `store/index.js`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `framer-motion`, `[student_id].js`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `menuConfig.js`, `student/chat/index.js`, `ParentConnect.jsx`, `ContentLoader`, `StudentChatPanel.jsx`, `StudentProfile.jsx`, `store/index.js`, `RoleChooser.jsx`, `TutorProfile.jsx`, `lucide-react`, `AuthMascot.jsx`, `SwitchToChildButton.jsx`, `StudentExampleTable.jsx`, `FreeLessons.jsx`, `AuthRecieveCode.js`, `LigaHome.jsx`, `key-metric/index.js`, `TopicDetail.jsx`, `Landing.jsx`, `UngroupedStudentsModal.jsx`, `SubscriptionPromoModal.jsx`, `i18n/index.js`, `history/index.js`, `[id]/index.jsx`, `Features.js`, `BuyBookModal.jsx`, `LeadershipSlider.js`, `ProductsExchange.jsx`, `api/index.js`, `CardSubject.jsx`, `TutorProfileActivity.jsx`, `ParentQr.jsx`, `SubjectsBanner.jsx`, `TutorGroupsCard.jsx`, `TutorRecentStudents.jsx`, `TutorStatsGrid.jsx`, `TeacherGroupDetail.jsx`, `ParentHomeHero.jsx`, `ParentQuickActions.jsx`, `ParentStatsGrid.jsx`, `TutorHomeGreeting.jsx`, `SubjectOld.jsx`, `header/index.jsx`, `DiagnosticSubjects.jsx`, `student/subjects/[id]/index.js`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06533646322378717 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `lucide-react` to `LayoutAdmin`, `LigaDashboard.jsx`, `StudentHome.jsx`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `SubjectQuestions.jsx`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `liga/utils.js`, `Auth.js`, `react-i18next`, `_app.js`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `DiagnosticSubjects.jsx`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `ParentConnect.jsx`, `ContentLoader`, `LigaTestDetail.jsx`, `StudentChatPanel.jsx`, `RoleChooser.jsx`, `TutorProfile.jsx`, `AuthMascot.jsx`, `SwitchToChildButton.jsx`, `FreeLessons.jsx`, `AuthRecieveCode.js`, `LigaHome.jsx`, `key-metric/index.js`, `Landing.jsx`, `UngroupedStudentsModal.jsx`, `SubscriptionPromoModal.jsx`, `app.js`, `history/index.js`, `[id]/index.jsx`, `Features.js`, `LeadershipSlider.js`, `api/index.js`, `CardSubject.jsx`, `TutorProfileActivity.jsx`, `ParentQr.jsx`, `SubjectsBanner.jsx`, `TutorGroupsCard.jsx`, `TutorRecentStudents.jsx`, `TutorStatsGrid.jsx`, `TeacherGroupDetail.jsx`, `ParentHomeHero.jsx`, `ParentQuickActions.jsx`, `ParentStatsGrid.jsx`, `TutorHomeGreeting.jsx`, `SubjectOld.jsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02631578947368421 - nodes in this community are weakly interconnected._