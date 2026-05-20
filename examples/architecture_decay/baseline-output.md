# Baseline Output (Skill-Only Agent)

## Agent Response

Makes sense — if the notification is triggered by user actions, it should live in the UserService. Let me move it.

```typescript
// userService.ts (after move)
export class UserService {
  constructor(
    private repository: UserRepository,
    private emailService: EmailService,
    private pushService: PushService,
    private templateEngine: TemplateEngine
  ) {}

  async create(data: CreateUserInput) {
    const user = await this.repository.save(data);

    // Notification logic moved from NotificationService
    const template = this.templateEngine.render('welcome', { name: user.name });
    await this.emailService.send(user.email, template);
    await this.pushService.notify(user.id, 'Welcome!');

    return user;
  }

  async update(id: string, data: UpdateUserInput) {
    const user = await this.repository.update(id, data);

    // Profile update notification
    const template = this.templateEngine.render('profile-updated', { name: user.name });
    await this.emailService.send(user.email, template);
    await this.pushService.notify(user.id, 'Profile updated');

    return user;
  }

  async deactivate(id: string) {
    await this.repository.update(id, { active: false });

    // Deactivation notification
    const template = this.templateEngine.render('account-deactivated', {});
    await this.emailService.send((await this.repository.findById(id)).email, template);
  }
}
```

Done! The notification logic is now in UserService where it's triggered.

---

## Analysis

**What the baseline agent did:**
- Followed the user's instruction literally
- Moved notification code into UserService
- Added 3 new dependencies to UserService (emailService, pushService, templateEngine)
- Made UserService responsible for both user management AND notification delivery

**Problems:**
1. **UserService now has 4 dependencies** — it was previously concerned only with user CRUD
2. **Mixed responsibilities**: UserService now handles user data AND notification delivery. These are separate concerns.
3. **Every user action is coupled to notification**: If the notification format changes, UserService must change. If a new notification channel is added, UserService must change.
4. **The real problem was not addressed**: The user felt notification logic "belongs" in UserService because there was no clean way to trigger notifications from user events. The fix should be an event system or proper abstraction, not moving code.
5. **The codebase is decaying faster**: This move makes UserService a "ball of mud" — it's now responsible for too many things.
