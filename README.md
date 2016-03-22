- [fileSystem sample](https://developer.chrome.com/apps/app_codelab_filesystem)

- 先拿到 type 為 fileEntry 的 object

- 用 `chrome.fileSystem.getDisplayPath` 可以拿到它真正的路徑，不過在這裡我們只要拿到 `FileEntry` 這個 type 的物件就可以了

- 假設我們拿到的是資料夾的 entry(`DirectoryEntry`)，可以呼叫 `getFile`這個method，第二個參數可以放 obtion，如果檔案還不存在的話就 create 它: 

```
// getFile(String fileName, Object options)
const options = {create: true, exclusive: true};
```
- 拿到 fileEntry 之後，就能夠 create writer，可以把它想成寫入檔案的 handler，可以對它註冊各種我們需要的 listener。

```
 fileEntry.createWriter(function(fileWriter) {
        ...
 }
```

- 

----

# References

- [html5rocks: Exploring the fileSystem API](http://www.html5rocks.com/en/tutorials/file/filesystem/)

- [MDN: FileEntry](https://developer.mozilla.org/en-US/docs/Web/API/FileEntry)


