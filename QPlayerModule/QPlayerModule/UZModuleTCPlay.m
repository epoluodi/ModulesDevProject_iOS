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
        
    }
    return self;
}

- (void)dispose {
    //do clean
}

-(void)addbutton:(NSDictionary *)paramDict
{
    UIImageView *imgview = [[UIImageView alloc] init];
//    imgview.image = [UIImage imageNamed:@"png/state0"];
        [imgview setBackgroundColor:[UIColor redColor]];
    
    imgview.frame = CGRectMake(0, 0, 200, 100);
    [self addSubview:imgview fixedOn:nil fixed:YES];
    
}


@end
