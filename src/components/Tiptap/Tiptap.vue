<template>
  <div class="editor">
    <div v-if="editor" class="menubar">
      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <i class="fas fa-bold" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        "
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <i class="fas fa-italic" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
        "
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <i class="fas fa-strikethrough" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        "
        :class="{ 'is-active': editor.isActive('underline') }"
      >
        <i class="fas fa-underline" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .setParagraph()
            .run()
        "
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        P
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 3 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        H3
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <i class="fas fa-list-ul" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <i class="fas fa-list-ol" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        "
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        <i class="fas fa-quote-right" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .undo()
            .run()
        "
      >
        <i class="fas fa-undo" />
      </button>

      <button
        class="menubar__button"
        @click="
          editor
            .chain()
            .focus()
            .redo()
            .run()
        "
      >
        <i class="fas fa-redo" />
      </button>
    </div>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
export default {
  components: {
    EditorContent
  },
  data() {
    return {
      editor: new Editor({
        extensions: [StarterKit, Underline],
        content: `asdf`
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    onEmit() {
      this.$emit("setContent", this.content);
    }
  }
};
</script>

<style lang="scss">
.editor {
  position: relative;
  border: 1px solid $gray-1;
  border-radius: 5px;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }
  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }
  .menubar {
    background-color: $gray-1;
    padding: 10px 0px;
    &__button {
      font-weight: bold;
      background: transparent;
      border: 0;
      color: $black;
      padding: 0.3rem 0.5rem;
      margin-right: 0.2rem;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: rgba($black, 0.05);
      }
      &.is-active {
        background-color: rgba($black, 0.1);
      }
    }
  }
  span#{&}__button {
    font-size: 13.3333px;
  }
  .editor__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    .ProseMirror {
      min-height: 10rem;
      padding: 0.5rem;
      &:focus {
        outline: none;
      }
      pre {
        padding: 0.7rem 1rem;
        border-radius: 5px;
        background: $black;
        color: $white;
        font-size: 0.8rem;
        overflow-x: auto;
        code {
          display: block;
        }
      }
      p code {
        padding: 0.2rem 0.4rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        background: rgba($black, 0.1);
        color: rgba($black, 0.8);
      }
      ul,
      ol {
        padding-left: 1rem;
      }
      li > p,
      li > ol,
      li > ul {
        margin: 0;
      }
      a:not(.btn) {
        color: $blue;
        text-decoration: underline;
      }
      blockquote {
        border-left: 3px solid rgba($black, 0.1);
        color: rgba($black, 0.8);
        padding-left: 0.8rem;
        font-style: italic;
        p {
          margin: 0;
        }
      }
      img {
        max-width: 100%;
        border-radius: 3px;
      }
      table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 0;
        overflow: hidden;
        td,
        th {
          min-width: 1em;
          border: 2px solid $gray-4;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
          > * {
            margin-bottom: 0;
          }
        }
        th {
          font-weight: bold;
          text-align: left;
        }
        .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }
        .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          z-index: 20;
          background-color: #adf;
          pointer-events: none;
        }
      }
      .tableWrapper {
        margin: 1em 0;
        overflow-x: auto;
      }
      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }
    }
  }
}
</style>
