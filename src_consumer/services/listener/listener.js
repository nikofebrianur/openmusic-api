class Listener {
    constructor(playlistsService, playlistSongsService, mailSender) {
      this._playlistsService = playlistsService;
      this._playlistSongsService = playlistSongsService;
      this._mailSender = mailSender;

      this.listen = this.listen.bind(this);
    }
  
    async listen(message) {
      try {
        const { playlist, targetEmail } = JSON.parse(message.content.toString());
  
        const playlistName = await this._playlistsService.getPlaylistName(playlist.id);
        const songs = await this._playlistSongsService.getSongsFromPlaylistId(playlist.id);
        
        const result = await this._mailSender.sendEmail(
          targetEmail,
          playlistName,
          JSON.stringify(songs),
        );
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  module.exports = Listener;
  