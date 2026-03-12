# 3D Math Visualization Enhancement Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the 3D Math Arena from a static result display into a dynamic, interactive educational experience that visualizes the *process* of calculation.

**Architecture:** Use `@react-three/fiber` to implement state-driven animations where spheres transition between "Input State" (separate color-coded groups) and "Result State" (merged collision).

**Tech Stack:** React, Three.js, React-Three-Fiber, Framer Motion, Lucide-React.

---

## I'm using the writing-plans skill to create the implementation plan.

## Proposed Strategies & Comparison

### Option 1: The "Fusion Arena" (Collision & Merging)
**Concept:** Two groups of spheres (Blue for Num1, Red for Num2). On "Play" or state change, they fly toward each other, collide with a "pop" effect, and merge into a single group of a new color (e.g., Purple/Teal).
*   **Pros:** 
    *   Visualizes the "Action" of adding/subtracting.
    *   Highly engaging "Wow" factor for children.
    *   Clearest representation of mathematical operations as a physical event.
*   **Cons:** 
    *   Complex performance (Physics/Collision logic).
    *   Animation duration might slow down rapid learning if not tuned correctly.

### Option 2: The "Logic Gallery" (Three Boxes Layout)
**Concept:** Instead of one large arena, we show three distinct smaller arenas. [Box 1: Num1] [Op: +] [Box 2: Num2] [=] [Box 3: Result].
*   **Pros:** 
    *   Perfect logical mapping of the equation to the visuals.
    *   Easiest for early learners to count groups independently.
    *   Stable and predictable layout.
*   **Cons:** 
    *   Requires significant screen real estate.
    *   Might look "busy" or cramped on mobile devices.

### Option 3: The "Layered Stack" (My Suggestion)
**Concept:** One box, but objects are stacked in distinct, labeled layers or "Trays". Addition slides a new tray in; Subtraction pulls a tray out.
*   **Pros:** 
    *   Maintains a single focal point.
    *   Visualizes "Groups" effectively without the chaos of collision.
    *   Better performance than full physics.
*   **Cons:** 
    *   Less "magical" than the fusion effect.

---

## Finalized Subtraction Strategy: "Option 1 (Interactive Pop)"
*Selected based on highest combined score in Feasibility, Engagement, and Performance, incorporating the User's interactive tapping requirement.*

**Concept Foundation:** We are taking **Option 1 (Destructive Pursuit / Popping)** and replacing the "auto-lasers" with the student's finger/mouse. Instead of a passive animation, the student actively *performs* the subtraction.

*   **Setup ($7 - 3 = ?$):** The arena initially renders 7 balls (`Num1`).
*   **Action:** The student is prompted to "take away" balls. They do this by physically tapping/clicking balls in the 3D space to 'remove' them (balls pop/disappear).
*   **Validation:** The answer is **NOT** automatically checked. The student must intentionally press a **"Kirim Jawaban" (Submit Answer)** button when they believe they have removed the correct amount.
*   **Resolution:** 
    *   **Correct:** If the number of removed balls equals `Num2`, success feedback plays, score increases, and the next question loads.
    *   **Incorrect:** If wrong, the wrong indicator shakes, and the arena resets (balls reappear) so the student can try again.

**Why Option 1 (Interactive Pop) is the best approach:**
1.  **Feasibility (High):** R3F makes mesh `onClick` events trivial (as guided by the `threejs-interaction` skill). 
2.  **Engagement (Maximum):** Popping bubbles/balls is universally satisfying for children. Transforms passive viewing into a tactile puzzle with agency.
3.  **Performance (Excellent):** Avoids complex physics engines, 3D pathfinding (Option 3 Vacuum), or transparent depth sorting layer issues (Option 2 Ghost). Relies on simple, highly optimized scale transitions.

**Relevant Agent Skills Utilized:**
1.  `threejs-interaction`: For implementing robust 3D raycasted `onClick` events and changing cursor states on hover.
2.  `threejs-animation`: For smooth scale interpolations during the "pop" effect.
3.  `threejs-fundamentals`: For basic scene and state management of visible vs. hidden meshes.

---

## Decision Log (Brainstorming Phase)

| Decision ID | Decision | Alternatives Considered | Rationale |
| :--- | :--- | :--- | :--- |
| **D-SUB-01** | **Interactive Pop & Remove** | Automated "Sinking/Fusing" animations | Direct interaction (tapping) maximizes educational engagement and perfectly visualizes "taking away". |
| **D-LAYOUT-01** | Maintain 50/50 Panel Layout | Full-width center layout | User explicitly preferred the previous balanced version; easier for rapid control usage. |
| **D-BOX-01** | Use Absolute Proportion Boxes | CSS Flex/Grow scaling | Percentages ensure strict adherence to container boundaries, preventing right-side bleeding. |

---

## Implementation Tasks (Refined for Interactive Subtraction)

### Task 1: Color-Coded Material System & State
**Files:** `src/components/features/MathArena3D.tsx`
**Step 1:** Define tracking state for subtracted balls (e.g., `setRemovedIds([])`).
**Step 2:** Ensure addition still uses the two-color (Blue/Red) system, but subtraction initially uses just one color (Blue) for the total pool.

### Task 2: Interactive 'onClick' Logic
**Files:** `src/components/features/MathArena3D.tsx`
**Step 1:** Add `onClick` handlers to the `MathBall` meshes.
**Step 2:** When clicked in subtraction 'play' mode, add the ball's ID to `removedIds` array (unlimited taps allowed, no auto-stopping).
**Step 3:** Change mouse cursor to pointer on hover.

### Task 3: The "Pop" Animation & Manual Reset
**Files:** `src/components/features/MathArena3D.tsx`
**Step 1:** Use scale transition so when a ball's ID enters `removedIds`, it scales to 0 and 'pops'.
**Step 2:** Expose a method or state trigger to clear `removedIds` (reset the arena) if the student answers incorrectly.

### Task 4: UI Integration ("Kirim Jawaban" Validation)
**Files:** `src/features/addition-subtraction/index.tsx`
**Step 1:** Replace the auto-validating logic in subtraction with a "Kirim Jawaban" button that appears during the Play phase.
**Step 2:** On click, evaluate `removedIds.length === num2`.
**Step 3:** If correct, show success, add score, and proceed. If wrong, trigger the existing `showWrong` state and reset the 3D arena.

---

## Execution Handoff

Plan complete. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration.

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints.

**Which approach or plan variant do you prefer?**
