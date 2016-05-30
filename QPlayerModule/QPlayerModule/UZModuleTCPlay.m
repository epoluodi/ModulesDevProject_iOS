//
//  UZModuleTCPlay.m
//  QPlayerModule
//
//  Created by 程嘉雯 on 16/5/29.
//  Copyright © 2016年 YXG. All rights reserved.
//

#import "UZModuleTCPlay.h"

@implementation UZModuleTCPlay

+ (void)launch {
    //在module.json里面配置的launchClassMethod，必须为类方法，引擎会在应用启动时调用配置的方法，模块可以在其中做一些初始化操作
}


- (id)initWithUZWebView:(UZWebView *)webView_ {
    if (self = [super initWithUZWebView:webView_]) {
        _playerView = [[TCPlayerView alloc] initControlView:nil bottomView:nil];
        _forceview = [[UIView alloc] init];
        [_forceview setBackgroundColor:[[UIColor blackColor] colorWithAlphaComponent:0.3]];
        _btncontrol = [[UIButton alloc] init];
        [_btncontrol setImage:[UIImage imageNamed:@"res_moduleDemo/play"] forState:UIControlStateNormal];
        _playerView.playerDelegate = self;
        
        [_btncontrol addTarget:self action:@selector(playControl) forControlEvents:UIControlEventTouchUpInside];
        [_playerView showMask:nil];
    }
    return self;
}

- (void)dispose {
    //do clean
    [_playerView stopAndRelease];
    [_btncontrol removeFromSuperview];
    [_forceview removeFromSuperview];
    [_playerView removeFromSuperview];
    _btncontrol =nil;
    _forceview =nil;
    _playerView =nil;
}






-(void)initTCPlayView:(NSDictionary *)paramDict
{
    NSLog(@"%@",paramDict);
    NSInteger x,y,w,h;
        x  = [paramDict integerValueForKey:@"x" defaultValue:0];
    y  = [paramDict integerValueForKey:@"y" defaultValue:0];
    w  = [paramDict integerValueForKey:@"w" defaultValue:0];
    h  = [paramDict integerValueForKey:@"h" defaultValue:0];
    videourl = [paramDict stringValueForKey:@"videoUrl" defaultValue:@""];
    if (![paramDict valueForKeyIsNull:@"IsAutoPlay"])
    {
        isautoplay = [paramDict boolValueForKey:@"IsAutoPlay" defaultValue:NO];
    }
    _playerView.frame =CGRectMake(x, y, w, h);
    _forceview.frame = CGRectMake(0, 0, _playerView.frame.size.width, _playerView.frame.size.height);
    [_playerView addSubview:_forceview];
    int _wh = BtnControlWH;
    _btncontrol.frame = CGRectMake(w /2 - _wh /2, h/2  - _wh /2, _wh, _wh);
    [_forceview addSubview:_btncontrol];
       [self addSubview:_playerView fixedOn:nil fixed:NO];
    
    
    TCPlayItem *item = [[TCPlayItem alloc] init];
    item.type = @"标清";
    item.url = @"http://200000987.vod.myqcloud.com/200000987_2403d512254811e6ad0a9bb665111595.f210.av.m3u8";
//http://200000987.vod.myqcloud.com/200000987_2403d512254811e6ad0a9bb665111595.f210.av.m3u8
    
    
    if (isautoplay){
        [_forceview setHidden:YES];
        [_playerView play:item];
    }
    else
    {
      
    }
}


#pragma mark 播放控制
//播放控制
-(void)playControl
{
    if([_playerView isPlaying])
    {
        [_playerView pause];
        return;
    }
    if ([_playerView isPaused])
    {
        [_playerView play];
        return;
    }
    
}


#pragma mark -

#pragma mark 播放回调事件

//资源准备失败
-(void)onPlayerFailed:(id<TCPlayerEngine>)player errorType:(TCPlayerErrorType)errType
{
    
}

#pragma mark  -


@end
