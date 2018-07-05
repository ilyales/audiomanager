<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "playlists".
 *
 * @property int $id
 * @property string $title
 * @property int $current
 * @property string $tracks_order
 *
 * @property PlaylistTracks[] $playlistTracks
 */
class Playlists extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'playlists';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'tracks_order'], 'required'],
            [['current'], 'integer'],
            [['tracks_order'], 'string'],
            [['title'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'current' => 'Current',
            'tracks_order' => 'Tracks Order',
        ];
    }

    public function getTracks()
    {
        return $this->hasMany(Tracks::className(), ['id' => 'track_id'])
                    ->viaTable('playlist_tracks', ['playlist_id' => 'id']);
    }

    public function getPlaylisttracks() {
        return $this->hasMany(PlaylistTracks::className(), ['playlist_id' => 'id']);
    }

    public function beforeSave($insert){
        parent::beforeSave($insert);

        if ($this->current === 1) {
            $playlists = Playlists::find()->where(['current' => 1])->all();
            foreach ($playlists as $key => $playlist) {
                if ($playlist->id!==$this->id) {
                    $playlist->current = 0;
                    $playlist->update();
                }
            }
        }

        return true;
    }
}
