import './App.less';

const EdiotrLeftTab = () => {
    return <div>EdiotrLeftTab</div>
}

const EdiotrNavbar = () => {
    return (
        <div className="editor-navbar">
        </div>
    )
}


const Editor = () => {
    return (
        <div className="editor-page">
            <EdiotrNavbar />
            <div className="editor-layout">
                <EdiotrLeftTab/>
            </div>
        </div>
    )
}

export default Editor;