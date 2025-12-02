function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <button onClick={ipcHandle}>RCON should log in</button>
    </>
  )
}

export default App
