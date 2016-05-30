//
//  UZModuleTCPlay.h
//  QPlayerModule
//
//  Created by 程嘉雯 on 16/5/29.
//  Copyright © 2016年 YXG. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UZModule.h"
#import "NSDictionaryUtils.h"
#import <TCPlayerSDK/TCPlayerSDK.h>
#import "TCPlayItem.h"

#define BtnControlWH 80;

@interface UZModuleTCPlay : UZModule<TCPlayerEngineDelegate>
{
    TCPlayerView *_playerView;//播放器
    UIView *_forceview;//背景图层
    UIButton *_btncontrol;//控制按钮
    BOOL isautoplay;//自动播放
    NSString *videourl;

}


-(void)addbutton:(NSDictionary *)paramDict;
//初始化播放插件
-(void)initTCPlayView:(NSDictionary *)paramDict;
@end
