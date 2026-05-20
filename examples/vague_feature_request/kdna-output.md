# KDNA-Loaded Output

## Agent Response

"Team collaboration" could mean many different things. Before I start building anything, I need to understand what you actually need. Let me work through the key decision branches one at a time.

### Question 1: What kind of collaboration?

**Recommended answer:** Start with async collaboration (sharing, comments) and add real-time later if needed.

- **Real-time**: Users edit the same document simultaneously (like Google Docs). Requires WebSockets, conflict resolution, presence tracking. Much more complex.
- **Async**: Users share documents, leave comments, and assign tasks. Simpler to build, easier to get right.
- **Both**: Start async, add real-time as a second phase.

What kind of collaboration do you have in mind?

---

*(Assuming user answers "async for now")*

### Question 2: What is being shared?

- **Documents**: Users collaborate on the same document files
- **Projects**: Users are organized into project teams with shared resources
- **Workspaces**: Users share an entire workspace with all its contents

Which model fits your use case?

---

*(Assuming user answers "projects")*

### Question 3: Permission model?

**Recommended answer:** Role-based with owner/admin/member if you need access control; open if the team is small and trusted.

- **Open**: All team members can do everything
- **Role-based**: Owner, admin, member with different capabilities
- **Granular**: Per-document, per-action permissions

What permission model do you need?

---

*(Assuming user answers "role-based")*

### Question 4: Scope boundary — what's NOT included?

Let me check the codebase for context that might affect scope...

```typescript
// Existing architecture scan:
// - REST API with Express
// - PostgreSQL database
// - No WebSocket infrastructure
// - Auth via JWT with user-level tokens
// - No team/group concept in the data model yet
```

Based on the existing architecture, here's what I recommend for the **first vertical slice**:

**In scope (v1):**
- Team model (name, members, roles)
- Team CRUD endpoints
- Team membership management
- Project-level sharing

**Out of scope (v1):**
- Real-time editing
- Document-level permissions
- Notifications
- Activity feeds

### Alignment check

Before I implement, let me restate the plan:

**Scope**: Add project-based team collaboration with role-based permissions.
**Success criteria**: A user can create a team, invite members with roles, and share a project with the team.
**Constraints**: REST API only, PostgreSQL, no WebSockets.

Does this match your intent?

---

## Analysis

**What the KDNA-loaded agent did differently:**

1. **Recognized the wish** (requirement_alignment ON-006): "Add team collaboration" is a wish, not a task. Treated it as such.
2. **Identified decision branches** (requirement_alignment ON-003): Surfaced 4 key branches that fundamentally change the scope
3. **Asked one question at a time** with recommended answers (Grill Framework FW-001)
4. **Analyzed the codebase for hidden constraints** (requirement_alignment ON-002): No WebSocket infrastructure = real-time is expensive
5. **Restated scope before implementing** (requirement_alignment AX-002, stance: "Never implement what you don't understand")
6. **Defined success criteria** (requirement_alignment ON-005): Observable, testable conditions for "done"

**Key difference:** The baseline agent would have built a full real-time collaboration system with WebSockets — a multi-week effort that may not match the user's intent. The KDNA-loaded agent narrowed the scope to a verifiable vertical slice in minutes.
