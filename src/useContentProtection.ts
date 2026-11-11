import { useEffect } from 'react';

/**
 * Checks if the target is an editable form element where text selection,
 * cursor navigation, and standard clipboard operations must remain functional.
 */
function isAllowedEditable(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  if (tagName === 'input') {
    const input = target as HTMLInputElement;
    const type = (input.type || 'text').toLowerCase();
    return ['text', 'search', 'email', 'password', 'url', 'number', 'tel'].includes(type);
  }
  if (tagName === 'textarea') return true;
  if (target.isContentEditable) return true;
  return false;
}

/**
 * Website-wide content protection hook.
 *
 * Implements client-side deterrents against:
 * 1. Image downloading via right-click or drag-and-drop.
 * 2. Mobile long-press callout/context menus on images and text.
 * 3. Text selection and highlighting across pages.
 * 4. Keyboard shortcuts for copying, selecting all, printing, or saving.
 *
 * Fully preserves usability for buttons, links, video players, modal dialogs,
 * checkboxes, inputs, and intentional copy actions (such as account number copy buttons).
 */
export function useContentProtection() {
  useEffect(() => {
    // 1. Prevent right-click / mobile long-press context menus on protected content and images
    const handleContextMenu = (event: MouseEvent) => {
      if (!isAllowedEditable(event.target)) {
        event.preventDefault();
      }
    };

    // 2. Prevent drag-and-drop saving of images, links, or text
    const handleDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    // 3. Prevent mouse or touch text selection
    const handleSelectStart = (event: Event) => {
      if (!isAllowedEditable(event.target)) {
        event.preventDefault();
      }
    };

    // 4. Block copy & cut on protected content (while allowing programmatic and editable inputs)
    const handleCopy = (event: ClipboardEvent) => {
      const activeEl = document.activeElement;
      if (!isAllowedEditable(event.target) && !isAllowedEditable(activeEl)) {
        event.preventDefault();
      }
    };

    const handleCut = (event: ClipboardEvent) => {
      const activeEl = document.activeElement;
      if (!isAllowedEditable(event.target) && !isAllowedEditable(activeEl)) {
        event.preventDefault();
      }
    };

    // 5. Intercept key combinations: Ctrl/Cmd + C, X, A, S, U, P
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAllowedEditable(event.target)) return;

      const isModifier = event.ctrlKey || event.metaKey;
      if (!isModifier) return;

      const key = event.key.toLowerCase();
      // 'c' = copy, 'x' = cut, 'a' = select all, 's' = save, 'u' = view source, 'p' = print
      if (['c', 'x', 'a', 's', 'u', 'p'].includes(key)) {
        event.preventDefault();
      }
    };

    // 6. Ensure all current and dynamically mounted images have draggable="false"
    const applyImageAttributes = () => {
      const images = document.querySelectorAll<HTMLImageElement>('img');
      images.forEach((img) => {
        if (img.getAttribute('draggable') !== 'false') {
          img.setAttribute('draggable', 'false');
        }
      });
    };

    applyImageAttributes();
    const observer = new MutationObserver(applyImageAttributes);
    observer.observe(document.body, { childList: true, subtree: true });

    const captureOptions = { capture: true, passive: false };

    document.addEventListener('contextmenu', handleContextMenu, captureOptions);
    document.addEventListener('dragstart', handleDragStart, captureOptions);
    document.addEventListener('selectstart', handleSelectStart, captureOptions);
    document.addEventListener('copy', handleCopy, captureOptions);
    document.addEventListener('cut', handleCut, captureOptions);
    document.addEventListener('keydown', handleKeyDown, captureOptions);

    return () => {
      observer.disconnect();
      document.removeEventListener('contextmenu', handleContextMenu, captureOptions);
      document.removeEventListener('dragstart', handleDragStart, captureOptions);
      document.removeEventListener('selectstart', handleSelectStart, captureOptions);
      document.removeEventListener('copy', handleCopy, captureOptions);
      document.removeEventListener('cut', handleCut, captureOptions);
      document.removeEventListener('keydown', handleKeyDown, captureOptions);
    };
  }, []);
}
