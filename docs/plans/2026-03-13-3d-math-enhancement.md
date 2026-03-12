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

## Implementation Tasks (Based on Option 1 + Option 2 Hybrid)

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
