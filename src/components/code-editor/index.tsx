import MoancoEditor, { OnMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parserBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import { useRef } from 'react'
import './code-editor.css'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>()

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue())
    })
  }

  const onFormatClick = async () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel()?.getValue()

    // format that value
    const formatted = await prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parserBabel, prettierPluginEstree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    })
    formatted.replace(/\n$/, '')

    // set the formatted value back in the editor
    try {
      editorRef.current.setValue(formatted)
    } catch (error) {
      console.error('error ', error)
    }
  }

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MoancoEditor
        onMount={handleEditorMount}
        value={initialValue}
        height="100%"
        theme="vs-dark"
        language="javascript"
        options={{
          wordWrap: 'on',
          fontLigatures: true,
          fontFamily: 'monospace',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}

export default CodeEditor
