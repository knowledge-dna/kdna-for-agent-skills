# KDNA-Loaded Output

## Agent Response

Before I move the notification logic, I want to understand the root cause of why it feels out of place.

**My hypothesis**: The problem isn't that notification logic is in the "wrong" service — it's that there's no clean mechanism for UserService to trigger notifications without directly calling NotificationService.

Let me check what's actually happening:

```typescript
// Current state
export class UserService {
  constructor(private repository: UserRepository) {}  // 1 dependency — clean
  async create(data) { return this.repository.save(data); }
  async update(id, data) { return this.repository.update(id, data); }
}

export class NotificationService {
  constructor(
    private emailService: EmailService,
    private pushService: PushService,
    private templateEngine: TemplateEngine
  ) {}

  async sendWelcome(user: User) { /* 3 notification dependencies */ }
  async sendProfileUpdated(user: User) { /* ... */ }
  async sendDeactivated(user: User) { /* ... */ }
}
```

The current architecture is actually **correct** — UserService handles user data, NotificationService handles notifications. They're separate concerns.

The friction you're feeling is that UserService doesn't **trigger** notifications. But moving notification logic into UserService would:

1. **Add 3 dependencies** to a previously clean service
2. **Mix responsibilities**: UserService would own both user management and notification delivery
3. **Couple every user action to notification format**: If notification changes, UserService changes

**The right fix is not to move the code — it's to connect the services properly.** Here are two options:

### Option A: UserService calls NotificationService (simple)

```typescript
export class UserService {
  constructor(
    private repository: UserRepository,
    private notifications: NotificationService  // 1 new dependency
  ) {}

  async create(data: CreateUserInput) {
    const user = await this.repository.save(data);
    await this.notifications.sendWelcome(user);
    return user;
  }
}
```

Pros: Simple, direct. UserService triggers notifications but doesn't own the logic.
Cons: UserService still knows about notifications.

### Option B: Event-driven (decoupled)

```typescript
export class UserService {
  constructor(
    private repository: UserRepository,
    private eventBus: EventBus  // 1 new dependency — abstract
  ) {}

  async create(data: CreateUserInput) {
    const user = await this.repository.save(data);
    this.eventBus.emit('user.created', { user });  // No notification knowledge
    return user;
  }
}

// NotificationService subscribes to events independently
export class NotificationService {
  constructor(private eventBus: EventBus) {
    eventBus.on('user.created', (payload) => this.sendWelcome(payload.user));
  }
}
```

Pros: Fully decoupled. UserService doesn't know about notifications.
Cons: More infrastructure. Harder to trace the flow.

### My recommendation

**Option A** if you have <5 notification triggers. **Option B** if you have many or expect more.

Which approach fits your situation? And should I write tests for whichever option we choose before implementing?

---

## Analysis

**What the KDNA-loaded agent did differently:**

1. **Questioned the premise** (bug_diagnosis AX-006: A symptom is not a cause): The user's request was a symptom ("notification logic feels wrong here") treated as a cause ("move it"). The agent identified the real cause: missing connection mechanism.
2. **Analyzed before acting** (bug_diagnosis stance: "The diagnosis is more valuable than the fix"): The agent examined the current architecture before making changes.
3. **Generated multiple hypotheses** (bug_diagnosis AX-002): Instead of one approach, proposed two with tradeoffs.
4. **Protected the architecture** (implicit architecture reasoning): Refused to make UserService a "ball of mud" by moving notification logic into it.
5. **Offered to write tests first** (TDD stance: "Behavior first, implementation second"): Suggested protecting the refactoring with tests.

**Key difference:** The baseline agent made the codebase worse by moving code and increasing coupling. The KDNA-loaded agent identified that the real problem was a missing abstraction and proposed solutions that preserve the architecture.
