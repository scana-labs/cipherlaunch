# Image generation.
        for token in tokens:
            im = self.create_token_image(token)
            self.upload_image(im, token.token_id)

        bucket_url = f"s3://{self.collection_bucket_name}"

        created_collection = create_new_collection(self.collection_id, self.project_id, bucket_url)

        create_collection_id = created_collection["collection_id"]
        created_collection_bucket = created_collection["bucket_url"]

        logger.debug(f"Created collection with id {create_collection_id} with bucket_url {created_collection_bucket}")

        return created_collection

    def create_token_image(self, token):
        # Create each composite.
        com_im = Image.alpha_composite(
            self.get_image(token.token_traits[self.categories[0]["name"]]),
            self.get_image(token.token_traits[self.categories[1]["name"]])
        )
        for category in self.categories[2:]:
            com_im = Image.alpha_composite(
                com_im,
                self.get_image(token.token_traits[category["name"]])
            )

        # Convert to RGB.
        return com_im.convert('RGB')

    def get_image(self, trait):
        image_s3_url = self.trait_images[trait]
        url_components = urlparse(image_s3_url)
        bucket = url_components.netloc
        key = url_components.path.lstrip("/")

        image_data = s3_client.get_object(Bucket=bucket, Key=key)['Body'].read()
        return Image.open(BytesIO(image_data)).convert('RGBA')

    def upload_image(self, img, token_id):
        buffer = BytesIO()
        img.save(buffer, "JPEG")
        buffer.seek(0)
        key = f"tokens/{token_id}.jpg"
        image_upload_response = s3_client.put_object(Bucket=self.collection_bucket_name, Key=key, Body=buffer)
        if image_upload_response['ResponseMetadata']['HTTPStatusCode'] != 200:
            status_code = image_upload_response['ResponseMetadata']['HTTPStatusCode']
            logger.error(
                f"Received status code {status_code} when attempting to put object to bucket " +
                f"{self.collection_bucket_name} and key {key}"
            )
            raise Exception(f"Failed to upload image for token {token_id} to bucket {self.collection_bucket_name}")
        logger.debug(f"Uploaded image to bucket {self.collection_bucket_name} and key {key}")