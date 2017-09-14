/* eslint-disable */
function DriveService(){ 

  //*****************************************************
  //GENERIC METHODS
  //*****************************************************
  
  this.publishFile = function(file, done) {
    const drive = gapi.client.drive;
    drive.revisions.update({
      fileId: file.id,
      revisionId: 1,
    }, {
      published: true, // <-- This is where the magic happens!
      publishAuto: true,
    }).then(function(resp) {
      console.log('file published', resp.result);
      resp.result.versionId = resp.result.id;
      resp.result.id = file.id;
      done(resp);
    });
  }

  this.loadFile = function(file, done) {
    gapi.client.drive.files.export({
      fileId: file.id,
      mimeType: 'text/plain',
      fields: 'id,name,parents'
    }).then(function(resp) {
      var retFile = {name: file.name, id: file.id, content: resp.body, parents: file.parents};
      done(retFile);
    });
  }

  this.saveFile = function(file, done) {
    function addContent(fileId) {
      return gapi.client.request({
          path: '/upload/drive/v3/files/' + fileId,
          method: 'PATCH',
          params: {
            uploadType: 'media'
          },
          body: file.content
        })
    }
    var metadata = {
      mimeType: 'application/vnd.google-apps.document',
      name: file.name,
      fields: 'id'
    }
    if (file.parents) {
      metadata.parents = file.parents;
    }

    if (file.id) { //just update
      addContent(file.id).then(function(resp) {
        console.log('File just updated', resp.result);
        done(resp.result);
      })
    } else { //create and update
      gapi.client.drive.files.create({
        resource: metadata
      }).then(function(resp) {
        addContent(resp.result.id).then(function(resp) {
          console.log('created and added content', resp.result);
          done(resp.result);
        })
      });
    }
  }

  this.list = function(resource,  done) {
    var query= ' name contains "'+resource.query_name+'" '
    if (resource.parents) {
      query+= ' and "'+resource.parents+'" in parents '
    }
    if (resource.mimeType) {
      query += ' and mimeType="'+resource.mimeType+'" '
    } 
    if (resource.trashed != undefined) {
      query += ' and trashed='+resource.trashed+' ';
    }
    gapi.client.drive.files.list({
        pageSize: 30,
        corpus: 'user',
        spaces: 'drive',
        fields: "nextPageToken, files(id, name, mimeType)",
        q: query,
        orderBy: resource.orderBy || 'modifiedTime desc'
    }).then(function(resp) {
      return done(null, resp.result.files);
    },function(reason) {
      return done(reason, null);
    })
  }
  
  //*****************************************************
  //SPECIFIC METHODS TO MAKE IT EASIER TO USE
  //*****************************************************

  this.createAndPublishFile = function(file, done) {
    var that = this;
    this.saveFile(file, function(resp) {
      file.id = resp.id;
      that.publishFile(file, done);
    });
  }

  this.listFilesAt = function(query_name, parents, done) {
    this.list({query_name:query_name, parents:parents, trashed:false}, done)
  }

  this.listFiles = function(query_name, done) {
    this.list({query_name:query_name, trashed:false}, done)
  }

  this.listFolders = function(query_name, parents, done) {
    this.list({query_name:query_name, mimeType: 'application/vnd.google-apps.folder', trashed:false}, done)
  }
  
  this.listFoldersAt = function(query_name, parents, done) {
    this.list({query_name:query_name, parents:parents, mimeType: 'application/vnd.google-apps.folder', trashed:false}, done)
  }

}

export default DriveService;
