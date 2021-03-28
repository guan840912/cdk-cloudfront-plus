import * as path from 'path';
import { CloudFrontWebDistribution, CloudFrontWebDistributionProps, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import * as s3 from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';
import * as extensions from './extensions';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'demo-stack');

// create the cloudfront distribution with extension(s)
const rewriteUriDemo = new extensions.RewriteUri(stack, 'rewriteUriDemo');

// create Demo S3 Bucket.
const Bucket = new s3.Bucket(stack, 'demoBucket', {
  autoDeleteObjects: true,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  websiteIndexDocument: 'index.html',
  websiteErrorDocument: 'error.html',
});

// Put demo Object to Bucket.
new BucketDeployment(stack, 'Deployment', {
  sources: [Source.asset(path.join(__dirname, '../host'))],
  destinationBucket: Bucket,
  retainOnDelete: false,
});

// CloudFront OriginAccessIdentity for Bucket
const originAccessIdentity = new OriginAccessIdentity(stack, 'OriginAccessIdentity', {
  comment: `CloudFront OriginAccessIdentity for ${Bucket.bucketName}`,
});

// Config CloudFrontWebDistribution.
const distibutionConfig: CloudFrontWebDistributionProps = {
  enableIpV6: false,
  originConfigs: [
    {
      s3OriginSource: {
        originAccessIdentity,
        s3BucketSource: Bucket,
      },
      behaviors: [{
        isDefaultBehavior: true,
        lambdaFunctionAssociations: [
          {
            eventType: rewriteUriDemo.eventType,
            lambdaFunction: rewriteUriDemo.functionVersion,
          },
        ],
      }],
    },
  ],
};

// create CloudFrontWebDistribution.
new CloudFrontWebDistribution(stack, 'Distribution', distibutionConfig);