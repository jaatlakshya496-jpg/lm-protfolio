import React from 'react';

const MOTION_PROPS = new Set([
  'initial', 'animate', 'exit', 'variants', 'transition', 'whileHover', 'whileTap',
  'whileInView', 'whileFocus', 'whileDrag', 'viewport', 'layout', 'layoutId',
  'drag', 'dragConstraints', 'onAnimationStart', 'onAnimationComplete',
]);

function MotionComponent(tag: string) {
  return function Motion(props: any) {
    const { children, ...rest } = props || {};
    const clean: any = {};
    for (const k in rest) {
      if (!MOTION_PROPS.has(k)) clean[k] = rest[k];
    }
    return React.createElement(tag, clean, children);
  };
}

export const motion = new Proxy({} as any, {
  get(_target, prop: string) {
    return MotionComponent(prop);
  },
});

export default { motion };
