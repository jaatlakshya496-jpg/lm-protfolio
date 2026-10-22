import React from 'react';

/**
 * Lightweight `motion/react` shim.
 *
 * The real `motion` package pulls in `motion-dom`, which fails to resolve in
 * some installs (missing `render/VisualElement.mjs`). This shim keeps the
 * `motion.*` API surface used across the app (motion.div, motion.section, ...)
 * and renders plain DOM elements, stripping animation-only props.
 *
 * IMPORTANT: components are memoised per tag. Creating a new component type on
 * every render makes React unmount/remount the subtree on each update, which
 * leads to infinite render loops and a blank page.
 */

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'whileHover',
  'whileTap',
  'whileInView',
  'whileFocus',
  'whileDrag',
  'viewport',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
]);

const RESERVED = new Set([
  'then',
  'catch',
  'finally',
  'prototype',
  'constructor',
  'toJSON',
  '$$typeof',
  'asymmetricMatch',
  'nodeType',
  'tagName',
  'hasAttribute',
  '$$typeof',
]);

const cache = new Map<string, React.FC<any>>();

function createComponent(tag: string): React.FC<any> {
  const Cached = function MotionShim(props: any) {
    const { children, ...rest } = props || {};
    const clean: Record<string, unknown> = {};
    for (const key in rest) {
      if (!MOTION_PROPS.has(key)) clean[key] = rest[key];
    }
    return React.createElement(tag, clean, children);
  };
  Cached.displayName = `MotionShim(${tag})`;
  return Cached;
}

export const motion = new Proxy({} as Record<string, React.FC<any>>, {
  get(_target, prop: string) {
    if (typeof prop !== 'string') return undefined;
    if (RESERVED.has(prop)) return undefined;
    let comp = cache.get(prop);
    if (!comp) {
      comp = createComponent(prop);
      cache.set(prop, comp);
    }
    return comp;
  },
  has() {
    return true;
  },
});

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export const useReducedMotion = () => false;

export default { motion, AnimatePresence, useReducedMotion };
