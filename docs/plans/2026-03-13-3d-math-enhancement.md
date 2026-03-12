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

## Subtraction Visualization Brainstorm (Process-Oriented)

The current "Merging" state works well for Addition ($+$) but is conceptually confusing for Subtraction ($-$). Here are 4 process-driven concepts to visualize "Taking Away":

### 1. The "Laser Hunter" (Destructive Pursuit)
**Concept:** `Num1` (Blue) spheres are the targets. `Num2` (Red) spheres transform into small "projectiles" or "energy bolts".
*   **Action:** One by one, a Red sphere flies into a Blue sphere.
*   **Result:** Both vanish in a "poof" of particles.
*   **Effect:** Children see exactly how many are being removed as they disappear pairs.

### 2. The "Ghost Overlay" (Phase Nullification)
**Concept:** `Num2` (Red) spheres turn into semi-transparent "Negative/Ghost" spheres.
*   **Action:** They fly and overlap exactly onto the first `Num2` spheres of the `Num1` group.
*   **Result:** When they touch, they "cancel out" and both shatter or fade away.
*   **Effect:** Visualizes the mathematical "cancellation" principle.

### 3. The "Vacuum Harvester" (Extraction Tool)
**Concept:** A small 3D "Vacuum" nozzle or "Claw" appearing at the top of the arena.
*   **Action:** It descends and sucks up exactly `Num2` spheres from the pile.
*   **Result:** Those spheres move into the nozzle and disappear.
*   **Effect:** Very intuitive "Taking Away" physical metaphor.

### 4. The "Sinking Depth" (Z-Axis Removal)
**Concept:** `Num1` (Blue) spheres are on a platform.
*   **Action:** `Num2` number of spheres slowly descend *through* the floor of the platform.
*   **Result:** They become transparent and vanish once they pass below.
*   **Effect:** Minimalist and clean, representing spheres leaving the "active area".

---

## Decision Log (Brainstorming Phase)

| Decision ID | Decision | Alternatives Considered | Rationale |
| :--- | :--- | :--- | :--- |
| **D-SUB-01** | Move away from "Merging" for Subtraction | Simple reverse animation | "Merging" implies combining; Subtraction needs a clear "Removal" process to be educational. |
| **D-LAYOUT-01** | Maintain 50/50 Panel Layout | Full-width center layout | User explicitly preferred the previous balanced version; easier for rapid control usage. |
| **D-BOX-01** | Use Absolute Proportion Boxes | CSS Flex/Grow scaling | Percentages ensure strict adherence to container boundaries, preventing right-side bleeding. |

---

## Implementation Tasks (Updated)

### Task 1: Color-Coded Material System
**Files:** 
- Modify: `src/components/features/MathArena3D.tsx`

**Step 1:** Define distinct constant colors for Num1 (Blue) and Num2 (Red).
**Step 2:** Update `MathBall` to accept a state-controlled color prop.
**Step 3:** Implement a "Merging" state color (e.g., `#2dd4bf` teal).

### Task 2: Multi-Group coordinate logic
**Files:** 
- Modify: `src/components/features/MathArena3D.tsx`

**Step 1:** Refactor `balls` useMemo to return two separate arrays: `balls1` and `balls2`.
**Step 2:** Position `balls1` to the left and `balls2` to the right initially.
**Step 3:** Add a `phase` state ('separate' | 'merging').

### Task 3: Collision Animation
**Files:** 
- Modify: `src/components/features/MathArena3D.tsx`

**Step 1:** Use `useFrame` or `framer-motion-3d` to animate positions from (Left/Right) to (Center) when `phase` becomes 'merging'.
**Step 2:** Trigger a scale "pulse" on collision.

### Task 4: UI Integration (The "Play" Button)
**Files:** 
- Modify: `src/features/addition-subtraction/index.tsx`

**Step 1:** Add a "Lihat Hasil" (See Result) button in the Learning controls.
**Step 2:** Connect button to the `phase` state in `MathArena3D`.

---

## Execution Handoff

Plan complete. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration.

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints.

**Which approach or plan variant do you prefer?**
