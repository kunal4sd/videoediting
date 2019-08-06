
<script type="text/template" id="modalImportMediaTemplate">
    <div class="modal fade" id="modalImportMedia" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Import media</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="" method="post">
                        <div class="form-group">
                            <label>
                                Youtube URL:
                            </label>
                            <input type="text" class="form-control" name="youtube_url" value="">
                        </div>
                        <hr>
                        <div class="file-input-container">
                            <input type="file" name="file" class="hidden-xs-up">
                            <button type="button" class="btn btn-lg btn-secondary btn-block file-input">
                                Browse files...
                            </button>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary js-button-submit">Import</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="modalConvertTemplate">
    <div class="modal fade" id="modalConvert" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Convert video</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="" method="post">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="opt-quality">
                                        Quality:
                                    </label>
                                    <select class="form-control" name="quality" id="opt-quality">
                                        <option class="low">Low</option>
                                        <option class="medium">Medium</option>
                                        <option class="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="opt-size">
                                        Size:
                                    </label>
                                    <select class="form-control" name="size" id="opt-size">
                                        <option value="360">360p</option>
                                        <option value="480">480p</option>
                                        <option value="576">576p</option>
                                        <option value="720">720p</option>
                                        <option value="1080">1080p</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="opt-format">
                                        Format:
                                    </label>
                                    <select class="form-control" name="format" id="opt-format">
                                        <option value="mp4">mp4</option>
                                        <option value="webm">webm</option>
                                        <option value="flv">flv</option>
                                        <option value="ogv">ogv</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">

                            </div>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Convert</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="renderModalTemplate">
    <div class="modal fade" id="renderModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><%- title %></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="" method="post">
                        <% if( type == 'render' ){ %>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">

                                    <label for="opt_title">
                                        Name:
                                    </label>
                                    <input class="form-control" type="text" name="title" value="" id="opt_title">

                                </div>
                            </div>
                        </div>
                        <% } %>
                        <div class="row" style="display:none">
                            <div class="col-12">
                                <div class="form-group">

                                    <label for="opt_title">
                                        Text on video:
                                    </label>
                                    <input class="form-control" type="text" name="text" value="" id="opt_text">

                                </div>
                            </div>
                        </div>
                        <div class="row" style="display:none">
                            <div class="col-md-6">
                                <div class="form-group">

                                    <label for="opt-quality">
                                        Quality:
                                    </label>
                                    <select class="form-control" name="quality" id="opt-quality">
                                        <option value="low">Low</option>
                                        <option value="medium" selected="selected">Medium</option>
                                        <option value="high">High</option>
                                    </select>

                                </div>
                            </div>
                            <div class="col-md-6">

                                <label for="opt-size">
                                    Size:
                                </label>
                                <select class="form-control" name="size" id="opt-size">
                                    <option value="360p">360p</option>
                                    <option value="480p" selected="selected">480p</option>
                                    <option value="576p">576p</option>
                                    <option value="720p">720p</option>
                                    <option value="1080p">1080p</option>
                                </select>

                            </div>
                        </div>
                        <div class="row" style="display:none">
                            <div class="col-md-6">
                                <div class="form-group">

                                    <label for="opt-format">
                                        Format:
                                    </label>
                                    <select class="form-control" name="format" id="opt-format">
                                        <option value="mp4">mp4</option>
                                        <option value="webm">webm</option>
                                        <option value="flv">flv</option>
                                        <option value="ogv">ogv</option>
                                    </select>

                                </div>
                            </div>
                            <div class="col-md-6" >
                                <div class="form-group">

                                    <label for="opt-aspect">
                                        Aspect ratio:
                                    </label>
                                    <select class="form-control" name="aspect" id="opt-aspect">
                                        <option value="16:9">16:9</option>
                                        <option value="4:3">4:3</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary js-button-submit">Create</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="listItemTemplate_input">
    <li class="list-group-item list-group-item-action show-on-hover-parent">
        <!-- div class="show-on-hover">
            <button type="button" class="btn btn-sm btn-icon btn-secondary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="convert_input" title="Convert">
                <span class="icon-loop"></span>
            </button>
            <button type="button" class="btn btn-sm btn-icon btn-secondary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="rename_input" title="Rename">
                <span class="icon-pencil"></span>
            </button>
            <button type="button" class="btn btn-sm btn-icon btn-secondary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="delete_input" title="Delete">
                <span class="icon-cross"></span>
            </button>
        </div -->

			<a class="icon-download2 btn btn-sm btn-icon btn-secondary toggle-tooltip" href="<%- vurl %>/<%- id %>.mp4" target="_blank" />

			</a>


                </a>
        <span class="btn btn-link" data-toggle="action" data-action="select-media_input" data-id="<%- id %>" title="<%- datetime %>, <%- duration_time %>, <%- width %>x<%- height %>, <%- file_size %>">
        <span class="badge badge-warning">
            <%- ext %>
        </span>
        &nbsp;
        <%- title %>
    </span>
    </li>
</script>


<script type="text/template" id="publication_output">
    <tr id=<%- id %>>
        <td>
           <%- id %>
        </td>
        <td>
            <%- name_en %> (   <% if(type_id == 3){ %> TV <% } else { %>Radio<% } %> )
        </td>
        <td>
            <%- country %>
        </td>
        <td>
            <%- language %>
        </td>

        <td>

            <div class="text-right no-wrap">

                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="managePublication" title="Manage">
                    <span class="icon-pencil"></span>
                </button>


            </div>

        </td>
    </tr>
</script>

<script type="text/template" id="listItemTemplate2_output">
    <tr id=<%- id %>>
        <td><!-- <%- ext %> -->
            <span class="badge badge-<%- labelColor %>">
                <%- labelText %>
            </span>
            &nbsp;
           <span class="toggle-tooltip" title="<%- keywords %>"> <%- title %>  </span>
        </td>
        <td>
            <%- iDatetime %>
        </td>
        <td>
            <%- cDatetime %>
        </td>
        <td>
            <%- channel %>
        </td>
        <td>
            <%- duration_time %>
        </td>
        <td>
            <%- file_size %>
        </td>
        <td>

            <div class="text-right no-wrap">

                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-action="play_output" data-id="<%- id %>" title="Play">
                    <span class="icon-play3"></span>
                </button>
                <a class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" href="<?php echo $config['base_url']; ?>index.php?action=download&itemId=<%- id %>&type=output" target="_blank" title="Download">
                    <span class="icon-download2"></span>
                </a>
                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="rename_output" title="Add Keywords">
                    <span class="icon-pencil"></span>
                </button>
                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="delete_output" title="Delete">
                    <span class="icon-cross"></span>
                </button>

            </div>

        </td>
    </tr>
</script>


<script type="text/template" id="listItemTemplate_output">
	<?php if ($_COOKIE['uid'] != 171){?>
    <tr id=<%- id %>>
        <td><!-- <%- ext %> -->
            <span class="badge badge-<%- labelColor %>">
                <%- labelText %>
            </span>
            &nbsp;
           <span class="toggle-tooltip" title="<%- keywords %>"> <%- title %>  </span>
        </td>
        <td>
            <%- datetime %>
        </td>
        <td>
            <%- duration_time %>
        </td>
        <td>
            <%- file_size %>
        </td>
        <td>

            <div class="text-right no-wrap">
                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-action="play_output" data-id="<%- id %>" title="Play">
                    <span class="icon-play3"></span>
                </button>
                <a class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" href="<?php echo $config['base_url']; ?>index.php?action=download&itemId=<%- id %>&type=output" target="_blank" title="Download">
                    <span class="icon-download2"></span>
                </a>
                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="rename_output" title="Add Keywords">
                    <span class="icon-pencil"></span>
                </button>
                <button type="button" class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" data-toggle="action" data-id="<%- id %>" data-action="delete_output" title="Delete">
                    <span class="icon-cross"></span>
                </button>

            </div>

        </td>
    </tr>
	<?php } else {?>
    <tr id=<%- id %>>
        <td><!-- <%- ext %> -->
            <span class="badge badge-<%- labelColor %>">
                <%- labelText %>
            </span>
            &nbsp;
           <span class="toggle-tooltip" title="<%- keywords %>"> <%- title %>  </span>
        </td>
        <td>
            <%- datetime %>
        </td>
        <td>

            <div class="text-right no-wrap">
                <a class="btn btn-sm btn-icon btn-outline-primary toggle-tooltip" href="tmp/vidsaver/<%- id %>.mp4" target="_blank" title="Download">
                    <span class="icon-download2"></span>
                </a>
            </div>

        </td>
    </tr>
	<?php }?>
</script>

<script type="text/template" id="listEmptyTemplate_input">
    <li class="list-group-item text-center disabled">
        Empty.
    </li>
</script>

<script type="text/template" id="listEmptyTemplate_output">
    <tr class="disabled">
        <td colspan="4">
            Empty.
        </td>
    </tr>
</script>

<script type="text/template" id="modalConfirmTemplate">
    <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <%- content %>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary js-button-submit">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="modalPubDetails">
    <div class="modal fade" id="modalAlert" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> Edit Publication Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<table>

						<tr>
							<td>Stream Link </td><td><input type="text" value="<%- stream_link %>" name="stream_link" /></td>
						</tr>
						<tr>
							<td>Frequency </td><td><input type="text" value="<%- frequency %>" name="frequency" /></td>
						</tr>
						<tr>
							<td>Frequency Modulation </td><td><input type="text" value="<%- frequency_modulation %>" name="frequency_modulation" /></td>
						</tr>
						<tr>
							<td>Radio Stream Link Online </td><td><input type="text" value="<%- radio_stream_link_online %>" name="radio_stream_link_online" /></td>
						</tr>
						<tr>
							<td>Radio Frequency Modulation </td><td><input type="text" value="<%- radio_frequency_modulation %>" name="radio_frequency_modulation" /></td>
						</tr>
						<tr>
							<td>Radio Frequency </td><td><input type="text" value="<%- radio_frequency %>" name="radio_frequency" /></td>
						</tr>
						<tr>
							<td>Note</td><td><textarea id="note" name="note" ><%- note %></textarea></td>
						</tr>
						<tr>
							<td>Polarity</td><td>
							<input type="radio" value="V" name="polarity" <% if(polarity == 'V' ){ %>checked="true"<% } %> /><b>V</b>
							<input type="radio" value="H" name="polarity" <% if(polarity == 'H' ){ %>checked="true"<% } %>  /><b>H</b></td>
						</tr>
						<tr>
							<td>Radio Sattlite Channel</td><td>
								<input type="radio" value="Y" name="radio_sattlite_channel" <% if(radio_sattlite_channel == 'Y' ){ %>checked="true"<% } %> /><b>Yes</b>
								<input type="radio" value="N" name="radio_sattlite_channel" <% if(radio_sattlite_channel == 'N' ){ %>checked="true"<% } %> /><b>No</b></td>
						</tr>
						<tr>
							<td>24 / 7 Recording </td><td>
								<input type="radio" value="Y" name="recording247" <% if(recording247 == 'Y' ){ %>checked="true"<% } %> /><b>Yes</b>
								<input type="radio" value="N" name="recording247" <% if(recording247 == 'N' ){ %>checked="true"<% } %> /><b>No</b></td>
						</tr>
						<input type="hidden" value="<%- publication_id %>" name="publication_id" />
					</table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary pub-js-button-submit" data-dismiss="modal">Save</button>
                </div>
            </div>
        </div>
    </div>
</script>


<script type="text/template" id="modalAlertTemplate">
    <div class="modal fade" id="modalAlert" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><%- title %></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <i class="<%- icon_class %>"></i>
                    &nbsp;
                    <%- content %>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="modalLargeTemplate">
    <div class="modal fade" id="modalLarge" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><%- title %></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <%= content %>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="alertTemplate">
    <div class="alert alert-<%- type %> alert-dismissible fade show mt-3" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong><%- title %>!</strong>
        <%- content %>
    </div>
</script>

<script type="text/template" id="episodeItemTemplate">
    <div class="col-md-2 col-sm-4 col-6 episode-item">
        <div class="card card-outline-secondary show-on-hover-parent">
            <div class="card-block" style="background-image: url('<%- imageUrl %>');">

            </div>
            <div class="show-on-hover">
                <button type="button" class="btn btn-sm btn-icon btn-secondary toggle-tooltip" data-toggle="action" data-action="play_episode" data-index="<%- index %>" title="Play">
                    <span class="icon-play3"></span>
                </button>
                <button type="button" class="btn btn-sm btn-icon btn-secondary toggle-tooltip" data-toggle="action" data-action="delete_episode" data-index="<%- index %>" title="Remove">
                    <span class="icon-cross"></span>
                </button>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="videoPreviewModalTemplate">
<style>
.select2-container-multi .select2-choices li{
	    font-size: 10px !important;
}
</style>
    <div class="modal fade" id="videoPreviewModal" tabindex="-1" role="dialog" >
        <div class="modal-dialog" role="document" style="max-width:1000px !important;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Preview</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
					<div style="float:left; width:500px;">
						<video src="<%- src %>" width="400" id="video-active" height="300"></video>
						<div><span id="current">0:00</span>/<span id="duration">0:00</span></div>
						<div class="row mt-3">
							<div class="col-8">
								<div class="input-range">
									<input type="range" value="0" step="1" min="0" max="100">
								</div>
							</div>
							<div class="col-4">
								<button type="button" class="btn btn-info btn-block js-button-play">
									<i class="icon-play3"></i>
									Play
								</button>
							</div>
						</div>
					</div>
					<div style="width:450px; float:right;">

						Title
						<textarea id="vtitle" name="vtitle" style="width:100%"></textarea>
						<hr />
						Text
						<textarea id="vtext" name="vtext" style="width:100%" dir="RTL"></textarea>
						<hr />
						Keywords Manager<br />


							<input type="hidden" name="hdkeys" id="hdkeys" value="" />
							<input name="keyword" type="text" id="keyword" placeholder="Select keywords" style="width:100%"  />
					<br />

						<br />
						<div class="modal-footer">
						     <input type="hidden" value="<%- vid %>" name="vid" id="vid" />
							<button type="button" class="btn btn-primary changeInfo" data-dismiss="modal" >Save Info</button>
						</div>

						<!-- div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div -->
					</div>
				<script>

		$.get( "/menu_json.php?getById="+<%- vid %>, function( data ) {
			  d= data;

			  $("#hdkeys").val(d);
				$("#keyword").select2({

					tokenSeparators: [",", " "],
					multiple: true,
					closeOnSelect: true,
					minimumInputLength: 2,
					ajax: {
						placeholder: 'Select Keywoards',
						url: '/menu_json.php?getBy=keywords',
						dataType: 'json',
						data: function (term, page) {

							return {
								searchTerm: term
							};
						},
						results: function (data, page) {

							return { results: data };
						}
					},
					initSelection: function (element, callback) {

						var x = document.getElementById("hdkeys").value;

						$.ajax('/menu_json.php?getBy=keywords&id=' + x, {
							type: 'GET',
							dataType: 'json'
						}).done(function (data) {
							callback(data);
						});
					}
				}).select2('val', []);
		});

					  $("#video-active").on(
						"timeupdate",
						function(event){
						  onTrackedVideoFrame(this.currentTime, this.duration);
					});

					  function formatTime(seconds) {
						minutes = Math.floor(seconds / 60);
						minutes = (minutes >= 10) ? minutes : "0" + minutes;
						seconds = Math.floor(seconds % 60);
						seconds = (seconds >= 10) ? seconds : "0" + seconds;
						return minutes + ":" + seconds;
					  }

					function onTrackedVideoFrame(currentTime, duration){


						$("#current").text(formatTime(currentTime));
						$("#duration").text(formatTime(duration))
					}

					$.getJSON( 'https://edit.mediaobserver-me.com/?action=get_media_info&vid='+<%- vid %>, function( data ) {
						$('#vtitle').val( data.headline );
						$('#vtext').val( data.text );
					});
					var idz =''





				</script>


                </div>

            </div>
        </div>
    </div>
</script>


<script type="text/template" id="modifyPublicationModalTemplate">
    <div class="modal fade" id="modifyPublicationModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Keywords</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
				                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary js-button-submit">Add Keywords</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>


            </div>
        </div>
    </div>
</script>


<script type="text/template" id="mediaRenameModalTemplate">
    <div class="modal fade" id="mediaRenameModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Keywords</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
					<!-- span id="keywordsList"><%- content %></span -->
					<select multiple  class="chosen-select" name="keyword[]" >
						<?php foreach($keywords_list as $kl){
							$selected = '';//($kl['id']==55) ? 'selected':'';
							echo '<option value="'.$kl['id'].'" '.$selected.'> '.$kl['name_en'] .' </option>';
						}?>
					</select>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary js-button-submit">Add Keywords</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
				<script>
					var tmp = '<%- content %>';
					var words = tmp.split(' , ');
					if(words[0] != 'No Keywords'){
						for(i = 0; i < words.length; i++) {
							$(".chosen-select option").filter(function() {	return this.text == words[i]; }).attr('selected', true);
						};
					}
					//$(".chosen-select option").filter(function() {	return this.text == 'Bateel'; }).attr('selected', true);
					//$(".chosen-select option").filter(function() {	return this.text == 'Arab Bank'; }).attr('selected', true);

					//$(".chosen-select").find("option[text=Bateel]").attr("selected","selected");
					//$(".chosen-select option:contains('Bateel'):first").attr("selected","selected");
					//$(".chosen-select option:contains('Arab Bank'):first").attr("selected","selected");

					$(".chosen-select").chosen({width: "95%", search_contains: true});
				</script>

            </div>
        </div>
    </div>
</script>

<script type="text/template" id="userStatTemplate">
    <div class="progress mt-3">
        <div class="progress-bar <% if(files_size_percent >= 85){ %>bg-danger<% } else { %>bg-success<% } %>" role="progressbar" style="width: <%- files_size_percent %>%" aria-valuenow="<%- files_size_percent %>" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="text-center small mb-3">
        Used:
        <%- files_size_percent %>%
        &mdash;
        <%- files_size_total_formatted %>
        /
        <%- files_size_max_formatted %>
    </div>
</script>

<script type="text/template" id="userProfileTemplate">
    <div class="row">
        <div class="col-md-6 form-group">
            <b>Email:</b>
        </div>
        <div class="col-md-6 form-group">
            <%- email %>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 form-group">
            <b>Name:</b>
        </div>
        <div class="col-md-6 form-group">
            <%- name %>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 form-group">
            <b>Role:</b>
        </div>
        <div class="col-md-6 form-group">
            <% if( role == 'admin' ){ %>
                <div class="badge badge-warning badge-pill"><%- role %></div>
            <% } else { %>
                <div class="badge badge-default badge-pill"><%- role %></div>
            <% } %>
        </div>
    </div>
    <!--div class="text-left">
        <a class="btn btn-sm btn-secondary" href="<?php echo $config['base_url']; ?>index.php?action=delete_user">
            Delete account
        </a>
    </div-->
</script>
