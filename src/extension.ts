'use strict'

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
    setContext(false)

    // current
    let editor = vscode.window.activeTextEditor

    if (editor && isAFile(editor)) {
        setContext(true)
    }

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        setContext(false)

        if (editor && isAFile(editor)) {
            setContext(true)
        }
    })

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.revealFileInFolder', () => {
            vscode.commands.executeCommand('revealFileInOS')
        })
    )
}

function isAFile({ document }: any) {
    return document.fileName.includes('/')
}

function setContext(val: any) {
    return vscode.commands.executeCommand('setContext', 'canRevealFile', val)
}

export function deactivate() {
}
