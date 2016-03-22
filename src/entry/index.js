function setDownloadUrl() {
  const defaultUrl = 'https://api.github.com/users/abalone0204';
  const url = this.refs.url.value ? this.refs.url.value : defaultUrl;
  console.log('start fetch from', url);
  fetch(url)
    .then(res => {
        console.log(res);
        return res.text();
    })
    .then(str => {
        this.setState({content: str}, ()=>{
            this.setState({url})
        })
    })
    .catch(ex => {
      console.log('parsing failed', ex);
    })
}

function chooseEntry() {
  chrome.fileSystem.chooseEntry({type: 'openDirectory'},(fileEntry, array) => {
    console.log('fileEntry', fileEntry);
    this.setState({fileEntry})
    chrome.fileSystem.getDisplayPath(fileEntry, (path) => {
        console.log(`choose ${path} as root directory`);
    })

  })
}

function writeToFile(dirEntry, string) {
    return () => {
        let truncated = false;
        const options = {create: true};
        dirEntry.getFile('result', options, 
            (fileEntry) => {
                let truncated = false;
                let blob = new Blob([string]);
                fileEntry.createWriter(fileWriter => {
                    fileWriter.onwriteend = function(e) {
                        if (!truncated) {
                          truncated = true;
                          // You need to explicitly set the file size to truncate
                          // any content that might have been there before
                          this.truncate(blob.size);
                          console.log('Completed');
                          return;
                        }
                    }
                    fileWriter.onerror = function(e) {
                        console.log('Write failed: ' + e.toString());
                    };
                    fileWriter.write(blob);
                })
            });

    }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'fileEntry': null,
      'content': null,
      'url': null
    }
  }
  
  render() {
    let {fileEntry, content, url} = this.state;
    
    return (
      <div>
        <button onClick={setDownloadUrl.bind(this)}>Download something</button>
        <button onClick={chooseEntry.bind(this)}>chooseEntry</button>
        <button onClick={writeToFile(fileEntry, content).bind(this)}>writeToFile</button>
        <div>
            <label htmlFor="url">URL: </label>
            <input ref="url" id="url" type="text"/>
        </div>
        <p>{ fileEntry ? `fileEntry: ${fileEntry.name}` : 'no file entry'}</p>
        <p>{ content ? `get content from ${url}` : 'no content'}</p>
      </div>
      );
  }
}

let app = document.querySelector('#app');
ReactDOM.render(<App/>, app);

