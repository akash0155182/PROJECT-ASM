package com.optimas.ams.exception;

import jakarta.ws.rs.core.Response;

public class AssetNotFoundException extends CustomException {
    public AssetNotFoundException(String assetId) {
        super("Asset with ID " + assetId + " not found", Response.Status.NOT_FOUND);
    }
}
