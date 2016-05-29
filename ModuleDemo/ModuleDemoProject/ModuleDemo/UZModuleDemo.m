//
//  UZModuleDemo.m
//  UZModule
//
//  Created by kenny on 14-3-5.
//  Copyright (c) 2014年 APICloud. All rights reserved.
//

#import "UZModuleDemo.h"
#import "UZAppDelegate.h"
#import "NSDictionaryUtils.h"

@interface UZModuleDemo ()
<UIAlertViewDelegate>
{
    NSInteger _cbId;
    
}

@end

@implementation UZModuleDemo

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
    imgview.image = [UIImage imageNamed:@"png/state0"];
//    [imgview setBackgroundColor:[UIColor redColor]];

    imgview.frame = CGRectMake(0, 0, 200, 100);
    [self addSubview:imgview fixedOn:nil fixed:YES];
    
}

- (void)showAlert:(NSDictionary *)paramDict {
    _cbId = [paramDict integerValueForKey:@"cbId" defaultValue:-1];
    NSString *message = [paramDict stringValueForKey:@"msg" defaultValue:nil];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:message delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
    [alert show];
}

#pragma mark - UIAlertViewDelegate
- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    if (_cbId >= 0) {
        NSDictionary *ret = @{@"index":@(buttonIndex+1)};
        [self sendResultEventWithCallbackId:_cbId dataDict:ret errDict:nil doDelete:YES];
    }
}




@end
